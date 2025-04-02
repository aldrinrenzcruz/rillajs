Element.prototype.$off = function (event, handler) {
  try {
    // If no arguments, remove all event listeners
    if (arguments.length === 0) {
      if ($rillaEvents.has(this)) {
        const handlers = $rillaEvents.get(this);

        handlers.forEach((eventHandlers, eventType) => {
          eventHandlers.forEach(fn => {
            this.removeEventListener(eventType, fn);
          });
        });

        // Clear the stored handlers
        $rillaEvents.delete(this);
      }
      return this;
    }

    // If event type specified but no handler
    if (arguments.length === 1 && typeof event === "string") {
      if ($rillaEvents.has(this)) {
        const handlers = $rillaEvents.get(this);

        if (handlers.has(event)) {
          handlers.get(event).forEach(fn => {
            this.removeEventListener(event, fn);
          });

          // Remove this event type from storage
          handlers.delete(event);
        }
      }
      return this;
    }

    // If both event and handler specified
    if (arguments.length === 2 && typeof event === "string" && typeof handler === "function") {
      if ($rillaEvents.has(this)) {
        const handlers = $rillaEvents.get(this);

        if (handlers.has(event)) {
          const handlerList = handlers.get(event);
          const index = handlerList.indexOf(handler);

          if (index !== -1) {
            // Remove the specific handler
            this.removeEventListener(event, handler);
            handlerList.splice(index, 1);

            // Clean up if no handlers left for this event
            if (handlerList.length === 0) {
              handlers.delete(event);
            }
          }
        }
      }
      return this;
    }

    console.error("off: Invalid arguments");
  } catch (error) {
    console.error("off: Error removing event listener(s)", error);
  }

  return this;
};

NodeList.prototype.$off = function (event, handler) {
  try {
    this.forEach(element => {
      if (arguments.length === 0) {
        element.$off();
      } else if (arguments.length === 1) {
        element.$off(event);
      } else {
        element.$off(event, handler);
      }
    });
  } catch (error) {
    console.error("off: Error removing event listener(s) from NodeList", error);
  }

  return this;
};