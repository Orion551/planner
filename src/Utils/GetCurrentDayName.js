import { DaysOfWeek } from '@Constants/DaysOfWeek';
export const getCurrentDayName = () => {
  return DaysOfWeek[new Date().getDay()];
};
