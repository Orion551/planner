import React, { useMemo } from 'react';
import { ScheduleColumnView } from '@Components/ScheduleColumn.view';
import '@Assets/styles/schedule.scss';
import { DragDropContext } from '@hello-pangea/dnd';
import { CalendarWidget } from '@Components/widgets/calendar-widget';
import { PlannedActivitiesWidget } from '@Components/widgets/planned-activities-widget';
import { CompletedActivitiesWidget } from '@Components/widgets/completed-activities-widget';
import { useTranslation } from 'react-i18next';
import { ScheduleTopControlsView } from '@Components/ScheduleTopControls/ScheduleTopControls.view';
import { ActivityModalView } from '@Components/ActivityModal/ActivityModal.view';
import { getCurrentDayName } from '@Utils/GetCurrentDayName';
import { Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
import { handleActivityMove } from '@Context/ActionHandlers/HandleScheduleColumn';

export const Schedule = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();
  const currentDayName = getCurrentDayName();

  // const theme = useTheme();
  // console.log(theme);
  const appBarHeight = 97;

  // Calculate remaining height based on viewport height minus app bar height
  const remainingHeight = `calc(100vh - ${appBarHeight}px)`;

  const memoizedActivities = useMemo(() => {
    console.log('rendering');
    return appState.configData.scheduleColumns.map((column) => {
      const activities = column.columnTaskIds.map((activityId) =>
        appState.activities.get(activityId)
      );
      return {
        columnId: column.columnId,
        activities: activities,
      };
    });
  }, [appState.activities, appState.configData.scheduleColumns]);

  /* drag&drop functionality */
  const onDragEnd = async (result) => {
    /* will be used to synchronously update the state. */
    const { destination, source, draggableId } = result;
    console.log('source', source);
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    if (destination.droppableId === startColumnId && destination.index !== source.index)
      dispatch(Actions.columnTaskSort(startColumnId, source.index, destination.index));
    else {
      const response = await handleActivityMove(startColumnId, finishColumnId, draggableId);
      response.success
        ? dispatch(Actions.columnTaskUpdate(startColumnId, finishColumnId, draggableId))
        : console.log('Error...');
    }
  };

  const countCompletedActivities = () => {
    return Array.from(appState.activities.values()).filter((activity) => activity.completed).length;
  };

  return (
    <Box display='flex' flexDirection='column' height={remainingHeight}>
      <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <Box display='flex' flexDirection='row' alignItems='flex-start' gap={2} p={1}>
          <CalendarWidget widgetName={'CalendarWidget'} />
          <PlannedActivitiesWidget
            plannedActivities={appState.activities.size}
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
          {appState.activityModal.isActivityModalOpen && <ActivityModalView />}
        </DragDropContext>
      </Box>
    </Box>
  );
};
