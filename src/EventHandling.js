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
        if (!$rillaEvents.has(this.element)) {
          $rillaEvents.set(this.element, new Map());
        }

        // Get the handlers map for this element
        const handlers = $rillaEvents.get(this.element);

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