import React from 'react';
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

export const ActivityCardView = ({ activityId, index }) => {
  const { state: appState, dispatch } = useGlobalState();
  const activity = appState.activities.get(activityId);

  const handleClick = () => {
    dispatch(Actions.toggleActivityModal(true, activityId));
  };

  const handleActivityStatusChange = async (event) => {
    const { name, checked } = event.target;

    const updatedActivity = {
      ...activity,
      [name]: checked,
    };

    try {
      await dispatchUpdateActivity(updatedActivity);
    } catch (err) {
      console.error('error', err);
    }
  };

  const dispatchUpdateActivity = async (updatedActivity) => {
    try {
      await updateActivity(dispatch, updatedActivity);
    } catch (err) {
      console.error('Error', err);
    }
  };

  return (
    <Draggable key={activityId} draggableId={activityId} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='ticket-card-wrapper'>
            <div className='ticket-card-header'>
              {activity.tag !== null && (
                <TagElementView
                  tagName={findTagById(appState.configData.userTags, activity.tag).tagName}
                  tagColor={findTagColorCode(
                    appState.configData.tagsPalette,
                    findTagById(appState.configData.userTags, activity.tag).tagColorId
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
                <span>{activity.title}</span>
              </Typography>

              {activity.project && (
                <div className='ticket-card-prj'>
                  <FolderIcon />
                  <Typography variant='subtitle2'>{activity.project}</Typography>
                </div>
              )}

              <div className='ticket-card-est'>
                <TimerIcon />
                <Typography variant='subtitle2'>{toHoursAndMinutes(activity.estimate)}</Typography>
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
