// Add a click event with capture: true
// document.querySelector('#myButton').on('click', handleClick).capture();
Element.prototype.capture = function () {
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
        this.addEventListener(eventType, originalHandler, { capture: true });
      }
    });
  } catch (error) {
    console.warn("capture: Error setting capture option", error);
  }
  return this;
};

NodeList.prototype.capture = function () {
  try {
    this.forEach(element => {
      element.capture();
    });
  } catch (error) {
    console.warn("capture: Error setting capture option on NodeList", error);
  }
  return this;
};