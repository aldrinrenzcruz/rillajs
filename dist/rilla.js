// Main function to select elements from the document
function $(selector) {
  return $select(document, selector);
}

// Method to select elements within a specific element
Element.prototype.$ = function (selector) {
  return $select(this, selector);
};

// Core selection function
function $select(context, selector) {
  // Ensure the selector is a valid, non-empty string
  if (typeof selector !== "string" || !selector.trim()) {
    console.error(`$: Invalid selector "${selector}"`);
    return null;
  }

  // Ensure the context is either the document or a valid element
  if (!(context instanceof Element) && context !== document) {
    console.error(`$: Invalid context`, context);
    return null;
  }

  let elements;

  try {
    // Attempt to select elements using querySelectorAll
    elements = context.querySelectorAll(selector);
  } catch (error) {
    // Catch and log invalid CSS selectors
    console.error(`$: Invalid CSS selector "${selector}"`, error);
    return null;
  }

  // Handle case where no elements match the selector
  if (!elements.length) {
    console.error(`$: ${selector} not found.`);
    return null;
  }

  // If an ID selector (`#id`) is used and multiple elements are found, return only the first one
  if (selector.startsWith("#") && elements.length > 1) {
    console.warn(`$: (${elements.length}) ${selector} elements found.`);
    return elements[0];
  }

  // Return a single element if only one was found, otherwise return the NodeList
  return elements.length === 1 ? elements[0] : elements;
}

Element.prototype.$prepend = function (htmlString) {
  if (!htmlString) {
    console.error('$prepend: invalid parameter');
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.prepend(fragment);
  return this;
};

Element.prototype.$append = function (htmlString) {
  if (!htmlString) {
    console.error('$append: invalid parameter');
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

Element.prototype.$paint = function (htmlString) {
  this.innerHTML = "";
  if (!htmlString) {
    console.error('$paint: invalid parameter');
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

Element.prototype.html = function (content) {
  if (content === undefined) return this.innerHTML;
  this.innerHTML = content;
  return this;
};
Element.prototype.text = function (content) {
  if (content === undefined) return this.textContent;
  this.textContent = content;
  return this;
};
Element.prototype.val = function (value) {
  if (value === undefined) return this.value;
  this.value = value;
  return this;
};

Element.prototype.$attr = function (name, value) {
  if (value === undefined) return this.getAttribute(name);
  this.setAttribute(name, value);
  return this;
};

Element.prototype.addClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("addClass: Input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("addClass: No valid classes provided");
    return this;
  }

  try {
    this.classList.add(...classes);
  } catch (error) {
    console.error("addClass: Error adding classes", error);
  }

  return this;
};

Element.prototype.removeClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("removeClass: Input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("removeClass: No valid classes provided");
    return this;
  }

  try {
    this.classList.remove(...classes);
  } catch (error) {
    console.error("removeClass: Error removing classes", error);
  }

  return this;
};

Element.prototype.toggleClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("toggleClass: Input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("toggleClass: No valid classes provided");
    return this;
  }

  try {
    classes.forEach(cls => this.classList.toggle(cls));
  } catch (error) {
    console.error("toggleClass: Error toggling classes", error);
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

        return this.element; // Return the element for further chaining
      }
    };

    // Automatically attach the event and return the handler for chaining
    // We defer the actual attachment to allow for chaining .prevent() and .stop()
    setTimeout(() => handler.attach(), 0);

    return handler;
  };

  // Add corresponding remove method (e.g., $removeClick, $removeKeydown)
  Element.prototype[`$remove${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = function (callback) {
    if (typeof callback === "function") {
      this.removeEventListener(eventName, callback);
    }
    return this;
  };
});

// Add the same methods to Document.prototype
$events.forEach(eventName => {
  Document.prototype[`$${eventName}`] = Element.prototype[`$${eventName}`];
  Document.prototype[`$remove${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] =
    Element.prototype[`$remove${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`];
});

// Add the same methods to Window.prototype
$events.forEach(eventName => {
  Window.prototype[`$${eventName}`] = Element.prototype[`$${eventName}`];
  Window.prototype[`$remove${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] =
    Element.prototype[`$remove${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`];
});

function $window(callback) {
  window.addEventListener("load", callback);
}

function $dom(callback) {
  document.addEventListener("DOMContentLoaded", callback);
}

const storage = (type, key, value) => {
  const store = type === "local" ? localStorage : sessionStorage;
  if (value === undefined) return JSON.parse(store.getItem(key));
  if (value === null) return store.removeItem(key);
  store.setItem(key, JSON.stringify(value));
};
const $local = (key, value) => storage("local", key, value);
const $session = (key, value) => storage("session", key, value);

// Helper function to get elements
function $getElement(param) {
  return typeof param === "string" ? document.querySelector(`#${param}`) : param;
}

// Add methods to HTMLElement prototype
HTMLElement.prototype.show = function(display_style = "block") {
  show(this, display_style);
  return this;
};

HTMLElement.prototype.hide = function() {
  hide(this);
  return this;
};

HTMLElement.prototype.toggle = function(display_style = "block") {
  toggle(this, display_style);
  return this;
};

// Standalone functions
function show(param, display_style = "block") {
  const element = $getElement(param);
  const display = display_style;
  if (element) {
    element.style.opacity = 0;
    element.style.display = display;
    requestAnimationFrame(function () {
      element.style.transition = "opacity 200ms";
      element.style.opacity = 1;
    });
    return element;
  } else {
    console.warn("Element being shown not found or invalid parameter.");
    return null;
  }
}

function hide(param) {
  const element = $getElement(param);
  if (element) {
    element.style.opacity = 0;
    requestAnimationFrame(function () {
      element.style.transition = "opacity 200ms";
      element.style.display = "none";
    });
    return element;
  } else {
    console.warn("Element being hidden not found or invalid parameter.");
    return null;
  }
}

function toggle(param, display_style = "block") {
  const element = $getElement(param);
  const display = display_style;
  if (element) {
    if (window.getComputedStyle(element).display === "none") {
      show(element, display);
    } else {
      hide(element);
    }
    return element;
  } else {
    console.warn("Element being toggled not found or invalid parameter.");
    return null;
  }
}

// Create global utility object
window = {
  show: show,
  hide: hide,
  toggle: toggle,
  getElement: $getElement,
  // Shorthand functions for elements by ID
  get: function(id) {
    const element = document.getElementById(id);
    return element;
  }
};

// Drag and Resize Function
function $initElDrag() {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var popups = document.querySelectorAll(".draggable");
  var elmnt = null;
  var currentZIndex = 1;
  for (var i = 0; i < popups.length; i++) {
    var popup = popups[i];
    var header = $getHeader(popup);
    popup.onmousedown = function () {
      this.style.zIndex = "" + ++currentZIndex;
    };
    if (header) {
      header.parentPopup = popup;
      header.onmousedown = $dragMouseDown;
    }
  }
  function $dragMouseDown(e) {
    elmnt = this.parentPopup;
    elmnt.style.zIndex = "" + ++currentZIndex;
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = $closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = $elementDrag;
  }
  function $elementDrag(e) {
    if (!elmnt) {
      return;
    }
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }
  function $closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  function $getHeader(element) {
    var headerItems = element.querySelectorAll(".draggable-header");

    if (headerItems.length === 1) {
      return headerItems[0];
    }
    return null;
  }
}
$initElDrag();

(function () {
  const style = document.createElement("style");
  document.head.appendChild(style);
  const sheet = style.sheet;

  sheet.insertRule(".draggable { position: absolute; overflow: hidden; z-index: 1; }", sheet.cssRules.length);
  sheet.insertRule(".draggable-header { cursor: grab; z-index: 1; }", sheet.cssRules.length);
})();

// (function () {
//   const sheet = new CSSStyleSheet();
//   sheet.insertRule(".draggable { position: absolute; overflow: hidden; z-index: 1; }");
//   sheet.insertRule(".draggable-header { cursor: grab; z-index: 1; }");

//   document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
// })();
