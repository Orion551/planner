/**
 *
 * @param {Event} event
 * @param {Function} onEnter What happens on keydown
 */
export const handleKeyDown = (event, onEnter) => {
  console.log(event);
  if (event.key === 'Enter') {
    onEnter();
  }
};
