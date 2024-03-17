import React, { useEffect, useState } from 'react';
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
import { getRequest } from '@Api/http-service';
import { ScheduleTopControlsView } from '@Components/ScheduleTopControls/ScheduleTopControls.view';
import { ApiUrl } from '@Constants/ApiUrl';
import CircularProgress from '@mui/material/CircularProgress';
import { useGlobalState } from '@Context/GlobalStateContext';

export const Schedule = () => {
  const [state, setState] = useState({ ...tasks, ...columnsData });

  const { appState, setAppState } = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date();
  const currentDayNumber = currentDate.getDay();

  /**
   * Will initially fetch activities from Remote. The result will be placed into the globalState object;
   */
  useEffect(() => {
    (async function () {
      try {
        await getRequest({ url: ApiUrl.activities }).then((response) => {
          setAppState((prevState) => ({
            ...prevState,
            activities: response,
          }));
          setIsLoading(false);
        });
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  }, [setAppState]);

  console.log('appState', appState);

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

  const countCompletedActivities = () => {
    // Get tasks into an array.
    const condition = (task) => task.completed === true;
    const tasks = Object.values(appState.activities);
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
              plannedActivities={Object.keys(appState.activities).length}
              widgetName={'PlannedActivitiesWidget'}
            />
          </Grid>
          <Grid item xs>
            <CompletedActivitiesWidget
              compltedActivities={countCompletedActivities()}
              widgetName={'CompletedActivitiesWidget'}
            />
          </Grid>
          {/*<PageDataControls />*/}
          <ScheduleTopControlsView />
        </Grid>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container direction='row' className='div-container' spacing={2}>
            <DragDropContext onDragEnd={onDragEnd}>
              {appState.configData['schedule-columns'].map((col, idx) => {
                /**
                 * For each colum nin my 'schedule-columns' array, extract the activities within (if any)
                 * Then, render the column and pass down the activities;
                 */
                const activities = col.columnTaskIds.map((taskId) =>
                  appState.activities.find((activity) => {
                    // TODO: This can receive more and more improvements;
                    return activity.id === taskId;
                  })
                );
                return (
                  <Grid item key={idx} xs={12}>
                    <ScheduleColumnView
                      key={col.columnId}
                      column={col}
                      tasks={activities}
                      day={col.columnId}
                      currentDayNumber={currentDayNumber}
                      dayLabel={t(`weekdays.${col.columnId}`)}
                    />
                  </Grid>
                );
              })}
            </DragDropContext>
          </Grid>
        )}
      </Grid>
    </>
  );
};
