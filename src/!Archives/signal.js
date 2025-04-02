// Add a click event with an AbortSignal
// const controller = new AbortController();
// document.querySelector('#myButton').on('click', handleClick).signal(controller.signal);

Element.prototype.signal = function (abortSignal) {
  try {
    if (!$rillaEvents.has(this)) {
      return this;
    }
    if (!(abortSignal instanceof AbortSignal)) {
      console.error("signal: Parameter must be an AbortSignal");
      return this;
    }
    const handlers = $rillaEvents.get(this);
    handlers.forEach((eventHandlers, eventType) => {
      if (eventHandlers.length > 0) {
        const lastIndex = eventHandlers.length - 1;
        const originalHandler = eventHandlers[lastIndex];
        this.removeEventListener(eventType, originalHandler);
        this.addEventListener(eventType, originalHandler, { signal: abortSignal });
      }
    });
  } catch (error) {
    console.error("signal: Error setting signal option", error);
  }
  return this;
};

NodeList.prototype.signal = function (abortSignal) {
  try {
    this.forEach(element => {
      element.signal(abortSignal);
    });
  } catch (error) {
    console.error("signal: Error setting signal option on NodeList", error);
  }
  return this;
};
