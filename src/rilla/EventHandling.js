const $eventHandlers = new WeakMap();

Element.prototype.on = function (event, handler) {
  if (typeof event !== "string") {
    console.error("on: Event type must be a string");
    return this;
  }

  if (typeof handler !== "function") {
    console.error("on: Handler must be a function");
    return this;
  }

  try {
    // Initialize handlers map for this element if it doesn't exist
    if (!$eventHandlers.has(this)) {
      $eventHandlers.set(this, new Map());
    }

    // Get the handlers map for this element
    const handlers = $eventHandlers.get(this);

    // Initialize array for this event type if it doesn't exist
    if (!handlers.has(event)) {
      handlers.set(event, []);
    }

    // Store the original handler for reference
    handlers.get(event).push(handler);

    // Add the event listener
    this.addEventListener(event, handler);
  } catch (error) {
    console.error(`on: Error adding '${event}' event listener`, error);
  }

  return this;
};

NodeList.prototype.on = function (event, handler) {
  if (typeof event !== "string") {
    console.error("on: Event type must be a string");
    return this;
  }

  if (typeof handler !== "function") {
    console.error("on: Handler must be a function");
    return this;
  }

  try {
    this.forEach(element => {
      element.on(event, handler);
    });
  } catch (error) {
    console.error(`on: Error adding '${event}' event listener to NodeList`, error);
  }

  return this;
};

Element.prototype.off = function (event, handler) {
  try {
    // If no arguments, remove all event listeners
    if (arguments.length === 0) {
      if ($eventHandlers.has(this)) {
        const handlers = $eventHandlers.get(this);

        handlers.forEach((eventHandlers, eventType) => {
          eventHandlers.forEach(fn => {
            this.removeEventListener(eventType, fn);
          });
        });

        // Clear the stored handlers
        $eventHandlers.delete(this);
      }
      return this;
    }

    // If event type specified but no handler
    if (arguments.length === 1 && typeof event === "string") {
      if ($eventHandlers.has(this)) {
        const handlers = $eventHandlers.get(this);

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
      if ($eventHandlers.has(this)) {
        const handlers = $eventHandlers.get(this);

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

NodeList.prototype.off = function (event, handler) {
  try {
    this.forEach(element => {
      if (arguments.length === 0) {
        element.off();
      } else if (arguments.length === 1) {
        element.off(event);
      } else {
        element.off(event, handler);
      }
    });
  } catch (error) {
    console.error("off: Error removing event listener(s) from NodeList", error);
  }

  return this;
};

Element.prototype.prevent = function () {
  try {
    if (!$eventHandlers.has(this)) {
      return this;
    }

    const handlers = $eventHandlers.get(this);

    handlers.forEach((eventHandlers, eventType) => {
      // Process the most recently added handler for each event type
      if (eventHandlers.length > 0) {
        const lastIndex = eventHandlers.length - 1;
        const originalHandler = eventHandlers[lastIndex];

        // Remove the original handler
        this.removeEventListener(eventType, originalHandler);

        // Create a new handler with preventDefault
        const newHandler = function (e) {
          e.preventDefault();
          return originalHandler.call(this, e);
        };

        // Replace the original handler with the new one
        eventHandlers[lastIndex] = newHandler;

        // Add the new handler
        this.addEventListener(eventType, newHandler);
      }
    });
  } catch (error) {
    console.error("prevent: Error adding preventDefault", error);
  }

  return this;
};

NodeList.prototype.prevent = function () {
  try {
    this.forEach(element => {
      element.prevent();
    });
  } catch (error) {
    console.error("prevent: Error adding preventDefault to NodeList", error);
  }

  return this;
};

Element.prototype.stop = function () {
  try {
    if (!$eventHandlers.has(this)) {
      return this;
    }

    const handlers = $eventHandlers.get(this);

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

const $events = [
  // Mouse Events
  "click", "dblclick", "mousedown", "mouseup", "mousemove",
  "mouseover", "mouseout", "mouseenter", "mouseleave",

  // Keyboard Events
  "keydown", "keyup", "keypress",

  // Form Events
  "input", "change", "submit", "focus", "blur", "reset",

  // Touch Events
  "touchstart", "touchend", "touchmove", "touchcancel",

  // Window/Document Events
  "scroll", "resize", "load", "unload", "beforeunload",

  // Drag Events
  "dragstart", "drag", "dragenter", "dragleave", "dragover", "drop", "dragend",

  // Clipboard Events
  "cut", "copy", "paste",

  // Media Events
  "play", "pause", "ended", "volumechange", "timeupdate",

  // Focus Events
  "focusin", "focusout",

  // Wheel and Scroll
  "wheel", "scroll",

  // Miscellaneous
  "contextmenu", "select"
];

$events.forEach(eventName => {
  // Create a method for each event type (e.g., $click, $keydown, $input)
  // options: { passive: true, capture: true, once: true }
  Element.prototype[`$${eventName}`] = function (callback, options = {}) {
    // Handle different callback types similar to previous implementation
    if (callback == null) {
      console.error(`$${eventName}: Callback cannot be null or undefined`);
      return this;
    }

    // Handle string callback
    if (typeof callback === "string") {
      try {
        // Priority 1: Check for global function
        if (typeof window[callback] === "function") {
          callback = window[callback];
        }
        // Priority 2: Try to create function from string
        else {
          callback = new Function("event", callback);
        }
      } catch (error) {
        console.error(`$${eventName}: Could not resolve function from string "${callback}"`, error);
        return this;
      }
    }

    // Validate callback is a function
    if (typeof callback !== "function") {
      console.error(`$${eventName}: Callback must be a function or a valid function string`);
      return this;
    }

    // Create a handler object to store event handling configuration
    const handler = {
      element: this,
      callback: callback,
      eventName: eventName,
      options: {
        passive: options.passive ?? false,
        capture: options.capture ?? false,
        once: options.once ?? false
      },
      preventDefault: false,
      stopPropagation: false,

      // The actual event listener function
      listener: null,

      // Chainable method to add preventDefault
      prevent: function () {
        this.preventDefault = true;
        return this;
      },

      // Chainable method to add stopPropagation
      stop: function () {
        this.stopPropagation = true;
        return this;
      },

      // Method to actually attach the event
      attach: function () {
        // Create the wrapped callback with the current configuration
        this.listener = (event) => {
          try {
            // Apply configured behaviors
            if (this.preventDefault) {
              event.preventDefault();
            }

            if (this.stopPropagation) {
              event.stopPropagation();
            }

            // Call the original callback
            const result = this.callback.call(this.element, event);

            // Support promise-based callbacks
            if (result instanceof Promise) {
              result.catch(error => {
                console.error(`$${this.eventName}: Async callback error`, error);
              });
            }

            return result;
          } catch (error) {
            console.error(`$${this.eventName}: Callback execution error`, error);
          }
        };

        // Add the event listener
        this.element.addEventListener(this.eventName, this.listener, this.options);

        // Initialize handlers map for this element if it doesn't exist
        if (!$eventHandlers.has(this.element)) {
          $eventHandlers.set(this.element, new Map());
        }

        // Get the handlers map for this element
        const handlers = $eventHandlers.get(this.element);

        // Initialize array for this event type if it doesn't exist
        if (!handlers.has(this.eventName)) {
          handlers.set(this.eventName, []);
        }

        // Store the listener for reference to enable off() method compatibility
        handlers.get(this.eventName).push(this.listener);

        // Also store the original callback for potential reference
        // We can associate them using a second WeakMap or just store as a property
        this.listener._originalCallback = this.callback;

        return this.element; // Return the element for further chaining
      }
    };

    // Automatically attach the event and return the handler for chaining
    // We defer the actual attachment to allow for chaining .prevent() and .stop()
    setTimeout(() => handler.attach(), 0);

    return handler;
  };
});

// Add the same methods to Document.prototype
$events.forEach(eventName => {
  Document.prototype[`$${eventName}`] = Element.prototype[`$${eventName}`];
});

// Add the same methods to Window.prototype
$events.forEach(eventName => {
  Window.prototype[`$${eventName}`] = Element.prototype[`$${eventName}`];
});

function $window(callback) {
  window.addEventListener("load", callback);
}

function $dom(callback) {
  document.addEventListener("DOMContentLoaded", callback);
}