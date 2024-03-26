import React, { useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ActivityCardView } from '@Components/ActivityCard/ActivityCard.view';
import { NoActivitiesLabel } from '@Utils/NoActivitiesLabel';
import { Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { useGlobalState, toggleActivityModal } from '@Context/GlobalStateContext';

const HeaderCustomText = {
  fontWeight: 600,
};

export const ScheduleColumnView = ({ dayLabel, currentDayNumber, activities, column, day }) => {
  const isCurrentDay = dayLabel === currentDayNumber ? 'current-day' : '';
  const { dispatch } = useGlobalState();

  // Memoize the rendered activities to prevent unnecessary re-renders
  const renderedActivities = useMemo(
    () =>
      activities.map((activity, index) => (
        <ActivityCardView key={activity.id} task={activity} index={index} />
      )),
    [activities]
  );

  const handleClick = () => {
    // Call the function to open the modal
    dispatch(toggleActivityModal(true, null, day));
  };

  return (
    <div className={`schedule-day-item ${day} ${isCurrentDay}`}>
      <div className='schedule-item-header'>
        <div className='schedule-item-header-info'>
          <div className={`schedule-item-name ${day}-schedule-item-name`}>
            <Typography variant='body1'>
              <span style={HeaderCustomText}>{dayLabel}</span>
            </Typography>
          </div>

          <div className={`tasks-counter ${day}-tasks-counter`}>
            <Typography variant='body1'>
              <span style={HeaderCustomText}>{activities.length}</span>
            </Typography>
          </div>
        </div>

        <IconButton className={`schedule-new-task ${day}`} onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </div>

      <Droppable droppableId={column.columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {activities.length > 0 ? renderedActivities : <NoActivitiesLabel currentDay={day} />}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ScheduleColumnView;
