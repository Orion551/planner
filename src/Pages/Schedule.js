import React from 'react';
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

export class Schedule extends React.Component {
  state = { ...tasks, ...columnsData };
  currentDate = new Date();
  currentDayNumber = this.currentDate.getDay();

  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Backlog',
  ];

  componentDidMount() {
    console.log('tasks:', this.state);
  }

  /* drag&drop functionality */
  onDragEnd = (result) => {
    /* will be used to synchronously update the state. */
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);

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
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  };

  countCompletedTasks = () => {
    // Get tasks into an array.
    const condition = (task) => task.completed === true;
    const tasks = Object.values(this.state.tasks);
    return tasks.filter(condition).length;
  };

  render() {
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
                plannedActivities={Object.keys(this.state.tasks).length}
                widgetName={'PlannedActivitiesWidget'}
              />
            </Grid>
            <Grid item xs>
              <CompletedActivitiesWidget
                compltedActivities={this.countCompletedTasks()}
                widgetName={'CompletedActivitiesWidget'}
              />
            </Grid>
            {/*<PageDataControls />*/}
          </Grid>

          <Grid container direction='row' className='div-container' spacing={2}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {this.state.columnOrder.map((columnId, idx) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);
                return (
                  <Grid item key={idx} xs={12}>
                    <ScheduleColumnView
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      currentDay={this.daysOfWeek[this.currentDayNumber]}
                      day={column.id}
                    />
                  </Grid>
                );
              })}
            </DragDropContext>
          </Grid>
        </Grid>
      </>
    );
  }
}
