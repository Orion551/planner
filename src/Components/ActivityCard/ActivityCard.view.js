import React, { useState } from 'react';
// import useStateWithCallback from 'use-state-with-callback';
import { TagElementView } from '@Components/Tags/TagElement.view';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TimerIcon from '@mui/icons-material/Timer';
import FolderIcon from '@mui/icons-material/Folder';
import { Draggable } from '@hello-pangea/dnd';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
import '@Assets/styles/ticket.scss';
import { toHoursAndMinutes } from '@Utils/toHoursAndMinutes';
import { findTagById, findTagColorCode } from '@Utils/TagUtilities';
import Checkbox from '@mui/material/Checkbox';
import { updateActivity } from '@Context/ActionHandlers/HandleActivity';

export const ActivityCardView = ({ task, index }) => {
  const { state: appState, dispatch } = useGlobalState();
  const [activity, setActivity] = useState(task);

  const handleClick = () => {
    dispatch(Actions.toggleActivityModal(true, task.id));
  };

  const handleActivityStatusChange = async (event) => {
    const { name, checked } = event.target;

    const updatedActivity = {
      ...activity,
      [name]: checked,
    };

    setActivity(updatedActivity);

    try {
      await dispatchUpdateActivity(updatedActivity);
    } catch (err) {
      console.error('error');
    }

    // dispatch(Actions.setActivityStatus(task.id, event.target.checked));
  };

  const dispatchUpdateActivity = async (activity) => {
    try {
      await updateActivity(dispatch, activity);
    } catch (err) {
      console.error('Error');
    }
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='ticket-card-wrapper'>
            <div className='ticket-card-header'>
              {task.tag !== null && (
                <TagElementView
                  tagName={findTagById(appState.configData.userTags, task.tag).tagName}
                  tagColor={findTagColorCode(
                    appState.configData.tagsPalette,
                    findTagById(appState.configData.userTags, task.tag).tagColorId
                  )}
                />
              )}
              <IconButton onClick={handleClick}>
                <ZoomOutMapIcon
                  sx={{
                    width: '15px',
                    height: '15px',
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
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

              <div style={{ textAlign: 'left' }}>
                <Checkbox
                  name={'completed'}
                  checked={activity.completed}
                  onChange={handleActivityStatusChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
