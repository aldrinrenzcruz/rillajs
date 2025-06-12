// Add a click event with once: true
// document.querySelector('#myButton').on('click', handleClick).once();
Element.prototype.once = function () {
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
        this.addEventListener(eventType, originalHandler, { once: true });
      }
    });
  } catch (error) {
    console.warn("once: Error setting once option", error);
  }
  return this;
};
NodeList.prototype.once = function () {
  try {
    this.forEach(element => {
      element.once();
    });
  } catch (error) {
    console.warn("once: Error setting once option on NodeList", error);
  }
  return this;
};