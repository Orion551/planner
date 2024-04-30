import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ActivityCardView } from '@Components/ActivityCard/ActivityCard.view';
import { NoActivitiesLabel } from '@Utils/NoActivitiesLabel';
import { Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { useGlobalState, toggleActivityModal } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';

const HeaderCustomText = {
  fontWeight: 600,
};

/**
 *
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid red',
        minWidth: '200px',
        height: 'auto',
        bgcolor: 'primary.main',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
      }}
    >
      <Box display='flex' flexDirection='row'>
        <Typography variant='body1'>
          <span style={HeaderCustomText}>{dayLabel}</span>
        </Typography>
        <Typography variant='body1'>
          <span style={HeaderCustomText}>{column.activities.length}</span>
        </Typography>
        <IconButton className={`schedule-new-task ${day}`} onClick={handleClick}>
          <AddIcon />
        </IconButton>
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
