import React from 'react';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import { Draggable } from '@hello-pangea/dnd';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
import '@Assets/styles/ticket.scss';
import { toHoursAndMinutes } from '@Utils/toHoursAndMinutes';
import { updateActivity } from '@Context/ActionHandlers/HandleActivity';
import { findProjectById } from '@Utils/HandleProject';
import { useTranslation } from 'react-i18next';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const ActivityCardView = ({ activityId, index }) => {
  const { state: appState, dispatch } = useGlobalState();
  const activity = appState.activities.get(activityId);
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const handleClick = () => {
    dispatch(Actions.toggleActivityModal(true, activityId));
  };

  const handleActivityStatusChange = async () => {
    const updatedActivity = {
      ...activity,
      completed: !activity.completed,
    };

    try {
      await dispatchUpdateActivity(updatedActivity);
    } catch (err) {
      console.error('error', err);
    }
  };

  const dispatchUpdateActivity = async (updatedActivity) => {
    await updateActivity(dispatch, updatedActivity, t);
  };

  return (
    <Draggable key={activityId} draggableId={activityId} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='ticket-card-wrapper'>
            <div className='ticket-card-header'>
              <IconButton name={'completed'} onClick={handleActivityStatusChange} size='small'>
                <CircleIcon
                  sx={{
                    fontSize: '0.8rem',
                    color: (theme) =>
                      activity.completed ? theme.palette.success.main : theme.palette.warning.main,
                  }}
                />
              </IconButton>
              {activity.tag && <TagItemView tagId={activity.tag} embedded={true} />}
            </div>

            <div style={{ marginTop: '0.2rem' }}>
              <Typography variant='subtitle1' sx={{ lineHeight: '1.1rem' }}>
                <span>{activity.title}</span>
              </Typography>

              {activity.project && (
                <div className='ticket-card-prj'>
                  <Typography variant='body2'>
                    {findProjectById(appState.projects, activity.project).projectName}
                  </Typography>
                </div>
              )}

              <div className='ticket-card-est'>
                <Typography variant='caption'>{toHoursAndMinutes(activity.estimate)}</Typography>
              </div>
            </div>
            <IconButton size='small'>
              <KeyboardArrowUpIcon />
            </IconButton>
          </div>
        </div>
      )}
    </Draggable>
  );
};
