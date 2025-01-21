/**
 *
 * @param {Event} event
 * @param {Function} onEnter What happens on keydown
 */
export const handleKeyDown = (event, onEnter) => {
  if (event.key === 'Enter') {
    onEnter();
  }
};
