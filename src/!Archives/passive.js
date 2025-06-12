// Add a click event with passive: true
// document.querySelector('#myButton').on('click', handleClick).passive();
Element.prototype.passive = function () {
  try {
    if (!$rillaEvents.has(this)) {
      return this;
    }
    const handlers = $rillaEvents.get(this);
    handlers.forEach((eventHandlers, eventType) => {
      if (eventHandlers.length > 0) {
        const lastIndex = eventHandlers.length - 1;
        const originalHandler = eventHandlers[lastIndex];
        this.removeEventListener(eventType, originalHandler);
        this.addEventListener(eventType, originalHandler, { passive: true });
      }
    });
  } catch (error) {
    console.warn("passive: Error setting passive option", error);
  }
  return this;
};

NodeList.prototype.passive = function () {
  try {
    this.forEach(element => {
      element.passive();
    });
  } catch (error) {
    console.warn("passive: Error setting passive option on NodeList", error);
  }
  return this;
};