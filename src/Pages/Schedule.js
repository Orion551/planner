import React, { useState } from 'react';
import { PageTitleView } from '@Components/PageTitle.view';
import { ScheduleColumnView } from '@Components/ScheduleColumn.view';
import '@Assets/styles/schedule.scss';
import { DragDropContext } from '@hello-pangea/dnd';
import Grid from '@mui/material/Grid';
import { tasks } from '@Assets/resources/tasks';
import { columnsData } from '@Assets/resources/columns-data';
import { CalendarWidget } from '@Components/widgets/calendar-widget';
import { PlannedActivitiesWidget } from '@Components/widgets/planned-activities-widget';
import { CompletedActivitiesWidget } from '@Components/widgets/completed-activities-widget';
import { useTranslation } from 'react-i18next';

export const Schedule = () => {
  const [state, setState] = useState({ ...tasks, ...columnsData });
  const currentDate = new Date();
  const currentDayNumber = currentDate.getDay();

  const { t } = useTranslation();

  /* drag&drop functionality */
  const onDragEnd = (result) => {
    /* will be used to synchronously update the state. */
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);

      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  const countCompletedTasks = () => {
    // Get tasks into an array.
    const condition = (task) => task.completed === true;
    const tasks = Object.values(state.tasks);
    return tasks.filter(condition).length;
  };

  return (
    <>
      <Grid id='page' container direction='column' spacing={1}>
        <Grid item xs={1}>
          <PageTitleView currentView='schedule' />
        </Grid>

        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent='space-around'
          alignItems='flex-start'
          className='div-container'
        >
          {/* 🔥 TODO: widgetName prop should be a constant placed somewhere (to reduce error-prone stuff..) */}
          {/* 🔥🔥🔥 TODO: Manage state on widgets*/}
          <Grid item xs>
            <CalendarWidget widgetName={'CalendarWidget'} />
          </Grid>
          <Grid item xs>
            <PlannedActivitiesWidget
              plannedActivities={Object.keys(state.tasks).length}
              widgetName={'PlannedActivitiesWidget'}
            />
          </Grid>
          <Grid item xs>
            <CompletedActivitiesWidget
              compltedActivities={countCompletedTasks()}
              widgetName={'CompletedActivitiesWidget'}
            />
          </Grid>
          {/*<PageDataControls />*/}
        </Grid>

        <Grid container direction='row' className='div-container' spacing={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            {state.columnOrder.map((columnId, idx) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
              return (
                <Grid item key={idx} xs={12}>
                  <ScheduleColumnView
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    currentDayNumber={currentDayNumber}
                    dayLabel={t(`weekdays.${column.id}`)}
                  />
                </Grid>
              );
            })}
          </DragDropContext>
        </Grid>
      </Grid>
    </>
  );
};
