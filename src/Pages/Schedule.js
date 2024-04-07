import React, { useEffect, useState, useMemo } from 'react';
import { PageTitleView } from '@Components/PageTitle.view';
import { ScheduleColumnView } from '@Components/ScheduleColumn.view';
import '@Assets/styles/schedule.scss';
import { DragDropContext } from '@hello-pangea/dnd';
import Grid from '@mui/material/Grid';
import { CalendarWidget } from '@Components/widgets/calendar-widget';
import { PlannedActivitiesWidget } from '@Components/widgets/planned-activities-widget';
import { CompletedActivitiesWidget } from '@Components/widgets/completed-activities-widget';
import { useTranslation } from 'react-i18next';
import { getRequest } from '@Api/http-service';
import { ScheduleTopControlsView } from '@Components/ScheduleTopControls/ScheduleTopControls.view';
import { ApiUrl } from '@Constants/ApiUrl';
import CircularProgress from '@mui/material/CircularProgress';
import { ActivityModalView } from '@Components/ActivityModal/ActivityModal.view';

import {
  useGlobalState,
  initActivities,
  columnTaskUpdate,
  columnTaskSort,
} from '@Context/GlobalStateContext';

export const Schedule = () => {
  const { state: appState, dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const currentDate = new Date();
  const currentDayNumber = currentDate.getDay();

  /**
   * Will initially fetch activities from Remote. The result will be placed into the globalState object;
   */
  useEffect(() => {
    (async function () {
      try {
        await getRequest({ url: ApiUrl.activities }).then((response) => {
          dispatch(initActivities(response));
          setIsLoading(false);
        });
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  const memoizedActivities = useMemo(() => {
    return appState.configData.scheduleColumns.map((column) => {
      const activities = column.columnTaskIds.map((taskId) =>
        appState.activities.find((activity) => activity.id === taskId)
      );
      return {
        columnId: column.columnId,
        activities: activities,
      };
    });
  }, [appState.activities, appState.configData.scheduleColumns]);

  /* drag&drop functionality */
  const onDragEnd = (result) => {
    /* will be used to synchronously update the state. */
    const { destination, source, draggableId } = result;
    console.log('source', source);
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    if (destination.droppableId === startColumnId && destination.index !== source.index)
      dispatch(columnTaskSort(startColumnId, source.index, destination.index));
    else dispatch(columnTaskUpdate(startColumnId, finishColumnId, draggableId));
  };

  const countCompletedActivities = () => {
    const tasks = Object.values(appState.activities);
    return tasks.filter((task) => task.completed === true).length;
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
              {memoizedActivities.map((column, idx) => (
                <Grid item key={idx} xs={12}>
                  <ScheduleColumnView
                    key={column.columnId}
                    column={column}
                    day={column.columnId}
                    currentDayNumber={currentDayNumber}
                    dayLabel={t(`weekdays.${column.columnId}`)}
                  />
                </Grid>
              ))}
              <ActivityModalView />
            </DragDropContext>
          </Grid>
        )}
      </Grid>
    </>
  );
};
