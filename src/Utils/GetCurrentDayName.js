import { DaysOfWeek } from '@Constants/DaysOfWeek';
/**
 * @returns {string} Uses Date() method to retrieve current day, then returns the long-version of the day (e.g Saturday instead of Sat)
 */
export const getCurrentDayName = () => {
  return DaysOfWeek[new Date().getDay()];
};
