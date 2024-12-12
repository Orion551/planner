export const findScheduledActivity = (activityId, scheduleColumns) => {
  return scheduleColumns.find((column) => column.columnTaskIds.includes(activityId)).columnId;
};
