import React from 'react';
import { TagElementView } from '@Components/Tags/TagElement.view';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TimerIcon from '@mui/icons-material/Timer';
import FolderIcon from '@mui/icons-material/Folder';
import { Draggable } from '@hello-pangea/dnd';
import { useGlobalState, toggleActivityModal } from '@Context/GlobalStateContext';
import styled from 'styled-components';

import '@Assets/styles/ticket.scss';
import { StatusView } from '@Utils/StatusView';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusViewContext } from '@Constants/StatusViewContext';
import { toHoursAndMinutes } from '@Utils/toHoursAndMinutes';
import { findTagById, findTagColorCode } from '@Utils/TagUtilities';

export const CustomIcon = styled(ZoomOutMapIcon)`
  width: 15px !important;
  height: 15px !important;
  border-radius: 10px !important;
  color: #1e1e1e !important;
`;

export const ActivityCardView = ({ task, index, allowStart }) => {
  const { state: appState, dispatch } = useGlobalState();
  allowStart;

  const handleClick = () => {
    dispatch(toggleActivityModal(true, task.id)); // TODO: This should get Activity's data;
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='ticket-card-wrapper'>
            <div className='ticket-card-header'>
              <TagElementView
                tagName={findTagById(appState.configData.userTags, task.tag).tagName}
                tagColor={findTagColorCode(
                  appState.configData.tagsPalette,
                  findTagById(appState.configData.userTags, task.tag).tagColorId
                )}
              />
              <IconButton onClick={handleClick}>
                <CustomIcon />
              </IconButton>
            </div>

            <div>
              <Typography variant='subtitle1'>
                <span>{task.title}</span>
              </Typography>

              {task.project && (
                <div className='ticket-card-prj'>
                  <FolderIcon />
                  <Typography variant='subtitle2'>{task.project}</Typography>
                </div>
              )}

              <div className='ticket-card-est'>
                <TimerIcon />
                <Typography variant='subtitle2'>{toHoursAndMinutes(task.estimate)}</Typography>
              </div>

              <div style={{ textAlign: 'center' }}>
                <StatusView
                  id={task.id}
                  context={StatusViewContext.activity}
                  viewMode={StatusViewModes.DETAILED}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
