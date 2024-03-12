import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ActivityCardView } from '@Components/ActivityCard/ActivityCard.view';
import { NoActivitiesLabel } from '@Utils/NoActivitiesLabel';
import { Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';

const HeaderCustomText = {
  fontWeight: 600,
};

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Backlog',
];

daysOfWeek;

export const ScheduleColumnView = ({ dayLabel, currentDayNumber, tasks, column, day }) => {
  const isCurrentDay = dayLabel === currentDayNumber ? 'current-day' : '';
  console.log('is current day', isCurrentDay);
  console.log('current day number', currentDayNumber);
  console.log('day label', dayLabel);

  // TODO: Simplify that mess;
  return (
    <>
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
                <span style={HeaderCustomText}>{tasks.length}</span>
              </Typography>
            </div>
          </div>

          <IconButton className={`schedule-new-task ${day}`}>
            <AddIcon />
          </IconButton>
        </div>

        <Droppable droppableId={column.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <ActivityCardView key={task.id} task={task} index={index} />
                ))
              ) : (
                <NoActivitiesLabel currentDay={day} />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};
