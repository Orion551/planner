import React, { useEffect, useState } from 'react';
// import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ActivityCardView } from '@Components/ActivityCard/ActivityCard.view';
import { NoActivitiesLabel } from '@Utils/NoActivitiesLabel';
import { Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
import { Actions } from '@Context/Actions';

/**
 * @param {Object} column - An object like so {columnId: 'backlog', activities: [<Activity>]}
 * @returns
 */
export const ScheduleColumnView = ({ dayLabel, currentDayNumber, column, day }) => {
  const isCurrentDay = dayLabel === currentDayNumber ? 'current-day' : '';
  const [columnActivities, setColumnActivities] = useState([]);
  const { dispatch } = useGlobalState();
  isCurrentDay;

  // Memoize the rendered activities to prevent unnecessary re-renders
  useEffect(() => {
    // TODO: DRAFT
    if (column.activities.length > 0) {
      setColumnActivities(column.activities);
      // return column.activities.map((activity, index) => (
      //   <ActivityCardView key={activity.id} task={activity} index={index} />
      // ));
    }
  }, [column.activities]);

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

      {/* TODO: Improve that by using -maybe- a <Box> element and doing some logics on whether there's content or not.  */}
      <Droppable droppableId={column.columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.activities.length > 0 ? (
              columnActivities.map((activity, index) => (
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
