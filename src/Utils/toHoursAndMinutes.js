/**
 * Converts time expressed in `minutes` to `hh:mm` format
 * @param {number} minutes - Time in minutes to convert
 * @returns {string}
 */
export const toHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  if (hours > 0 && min > 0) {
    return `${hours} hour(s) ${min} min`;
  } else if (hours > 0) {
    return `${hours} hour(s)`;
  } else {
    return `${min} min`;
  }
};
