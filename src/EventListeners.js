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
  // options: { stopPropagation: true, preventDefault: true, passive: true, capture: true, once: true }
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

    // Wrap the callback to provide additional context and error handling
    const wrappedCallback = (event) => {
      try {
        // Prevent default behavior if specified
        if (options.preventDefault) {
          event.preventDefault();
        }

        // Stop propagation if specified
        if (options.stopPropagation) {
          event.stopPropagation();
        }

        // Call the original callback
        const result = callback.call(this, event);

        // Support promise-based callbacks
        if (result instanceof Promise) {
          result.catch(error => {
            console.error(`$${eventName}: Async callback error`, error);
          });
        }

        return result;
      } catch (error) {
        console.error(`$${eventName}: Callback execution error`, error);
      }
    };

    // Add event listener with optional configuration
    this.addEventListener(eventName, wrappedCallback, {
      passive: options.passive ?? false,
      capture: options.capture ?? false,
      once: options.once ?? false
    });

    // Return this for method chaining
    return this;
  };

  // Add corresponding remove method (e.g., $removeClick, $removeKeydown)
  Element.prototype[`$remove${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = function (callback) {
    if (typeof callback === "function") {
      this.removeEventListener(eventName, callback);
    }
    return this;
  };
});