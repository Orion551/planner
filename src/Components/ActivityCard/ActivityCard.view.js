import React, { useMemo } from 'react';
import { TagElementView } from '@Components/Tags/TagElement.view';
import { ActivityTrackerView } from '@Components/ActivityCard/ActivityTracker.view';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TimerIcon from '@mui/icons-material/Timer';
import FolderIcon from '@mui/icons-material/Folder';
import { Draggable } from '@hello-pangea/dnd';
import { useGlobalState, toggleActivityModal } from '@Context/GlobalStateContext';
import styled from 'styled-components';

import '@Assets/styles/ticket.scss';

export const CustomIcon = styled(ZoomOutMapIcon)`
  width: 15px !important;
  height: 15px !important;
  border-radius: 10px !important;
  color: #1e1e1e !important;
`;

export const ActivityCardView = ({ task, index, allowStart }) => {
  const { state: appState, dispatch } = useGlobalState();

  const handleClick = () => {
    dispatch(toggleActivityModal(true, task.id)); // TODO: This should get Activity's data;
  };

  // Memoize tag color calculation
  const tagColor = useMemo(() => {
    const userTag = appState.configData.userTags.find((uT) => uT.id === task.tag);
    if (userTag) {
      const tagColorId = userTag.tagColorId;
      return appState.configData.tagsPalette.find((tagPalette) => tagPalette.id === tagColorId)
        ?.code;
    }
    return null;
  }, [appState.configData.tagsPalette, appState.configData.userTags, task.tag]);

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='ticket-card-wrapper'>
            <div className='ticket-card-header'>
              <TagElementView
                tagLabel={appState.configData.userTags.find((uT) => uT.id === task.tag)?.tagName}
                tagColor={tagColor}
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
                <Typography variant='subtitle2'>{task.estimate}</Typography>
              </div>

              {task.completed ? (
                <div className='ticket-card-completed-badge'>
                  <Typography variant='subtitle2'>Completed</Typography>
                </div>
              ) : (
                allowStart && (
                  <div className='ticket-card-activity-tracker'>
                    <ActivityTrackerView />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ActivityCardView;
