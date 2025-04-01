Element.prototype.stop = function () {
  try {
    if (!$rillaEvents.has(this)) {
      return this;
    }

    const handlers = $rillaEvents.get(this);

    handlers.forEach((eventHandlers, eventType) => {
      // Process the most recently added handler for each event type
      if (eventHandlers.length > 0) {
        const lastIndex = eventHandlers.length - 1;
        const originalHandler = eventHandlers[lastIndex];

        // Remove the original handler
        this.removeEventListener(eventType, originalHandler);

        // Create a new handler with stopPropagation
        const newHandler = function (e) {
          e.stopPropagation();
          return originalHandler.call(this, e);
        };

        // Replace the original handler with the new one
        eventHandlers[lastIndex] = newHandler;

        // Add the new handler
        this.addEventListener(eventType, newHandler);
      }
    });
  } catch (error) {
    console.error("stop: Error adding stopPropagation", error);
  }

  return this;
};

NodeList.prototype.stop = function () {
  try {
    this.forEach(element => {
      element.stop();
    });
  } catch (error) {
    console.error("stop: Error adding stopPropagation to NodeList", error);
  }

  return this;
};