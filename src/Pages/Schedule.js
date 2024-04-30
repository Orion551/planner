import React, { useEffect, useState, useMemo } from 'react';
import { ScheduleColumnView } from '@Components/ScheduleColumn.view';
import '@Assets/styles/schedule.scss';
import { DragDropContext } from '@hello-pangea/dnd';
// import Grid from '@mui/material/Grid';
import { CalendarWidget } from '@Components/widgets/calendar-widget';
import { PlannedActivitiesWidget } from '@Components/widgets/planned-activities-widget';
import { CompletedActivitiesWidget } from '@Components/widgets/completed-activities-widget';
import { useTranslation } from 'react-i18next';
import { getRequest } from '@Api/http-service';
import { ScheduleTopControlsView } from '@Components/ScheduleTopControls/ScheduleTopControls.view';
import { ApiUrl } from '@Constants/ApiUrl';
import CircularProgress from '@mui/material/CircularProgress';
import { ActivityModalView } from '@Components/ActivityModal/ActivityModal.view';
import { getCurrentDayName } from '@Utils/GetCurrentDayName';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  const currentDayName = getCurrentDayName();

  const theme = useTheme();
  console.log(theme);
  const appBarHeight = 97;

  // Calculate remaining height based on viewport height minus app bar height
  const remainingHeight = `calc(100vh - ${appBarHeight}px)`;

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
    console.log('rendering');
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
    <Box display='flex' flexDirection='column' height={remainingHeight}>
      <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <Box display='flex' flexDirection='row' alignItems='flex-start' gap={2} p={1}>
          <CalendarWidget widgetName={'CalendarWidget'} />
          <PlannedActivitiesWidget
            plannedActivities={Object.keys(appState.activities).length}
            widgetName={'PlannedActivitiesWidget'}
          />
          <CompletedActivitiesWidget
            compltedActivities={countCompletedActivities()}
            widgetName={'CompletedActivitiesWidget'}
          />
        </Box>

        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='flex-end'
          gap={2}
          p={1}
        >
          <ScheduleTopControlsView />
        </Box>
      </Box>

      <Box
        display='flex'
        flexDirection='row'
        gap={2}
        sx={{ width: '100%', flex: '1', overflowX: 'auto' }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            {memoizedActivities.map((column) => (
              // <Grid item key={idx} xs={12}>
              <ScheduleColumnView
                key={column.columnId}
                column={column}
                day={column.columnId}
                currentDayNumber={currentDayName}
                dayLabel={t(`weekdays.${column.columnId}`)}
              />
            ))}
            <ActivityModalView />
          </DragDropContext>
        )}
      </Box>
    </Box>
  );
};
