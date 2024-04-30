import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ActivityCardView } from '@Components/ActivityCard/ActivityCard.view';
import { NoActivitiesLabel } from '@Utils/NoActivitiesLabel';
import { Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { useGlobalState, toggleActivityModal } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';

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
    dispatch(toggleActivityModal(true, null, day));
  };

  return (
    <Box className={`schedule-day-item ${day} ${isCurrentDay}`}>
      <Box className={'schedule-day-item-header'}>
        <Box>
          <Typography variant='body2'>{dayLabel}</Typography>
        </Box>
        <Box>
          <Typography variant='body2'>{column.activities.length}</Typography>
        </Box>
        <Box>
          <IconButton className={`schedule-new-task ${day}`} onClick={handleClick}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <Droppable droppableId={column.columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.activities.length > 0 ? (
              columnActivities.map((activity, index) => (
                <ActivityCardView key={index} task={activity} index={index} />
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
