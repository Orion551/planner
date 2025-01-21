import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { ActivityCardView } from '@Components/ActivityCard/ActivityCard.view';
import { NoActivitiesLabel } from '@Utils/NoActivitiesLabel';
import { Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
import { Actions } from '@Context/Actions';

/**
 * @param dayLabel
 * @param currentDayNumber
 * @param {Object} column - An object like so {columnId: 'backlog', activities: [<Activity>]}
 * @param day
 * @returns
 */
export const ScheduleColumnView = ({ dayLabel, currentDayNumber, column, day }) => {
  const isCurrentDay = dayLabel === currentDayNumber ? 'current-day' : '';
  const { dispatch } = useGlobalState();

  const handleClick = () => {
    // Call the function to open the modal
    dispatch(Actions.toggleActivityModal(true, null, day));
  };

  return (
    <Box className={`schedule-column ${day} ${isCurrentDay}`}>
      <Box className={'schedule-column-header'}>
        <Box display='flex' alignItems='flex-start' gap={1} p={0}>
          <span className={`column-name ${day}-schedule-item-name`}>
            <Typography variant='body2'>{dayLabel}</Typography>
          </span>
          <span className={`column-activity-counter ${day}-activity-counter`}>
            <Typography variant='body2'>{column.activities.length}</Typography>
          </span>
        </Box>

        <Box className={`new-activity-button ${day}`} onClick={handleClick}>
          <AddIcon />
        </Box>
      </Box>

      <Droppable droppableId={column.columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.activities.length > 0 ? (
              column.activities.map((activity, index) => (
                <ActivityCardView key={index} index={index} activityId={activity.id} />
              ))
            ) : (
              <NoActivitiesLabel currentDay={day} />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
};

export default ScheduleColumnView;
