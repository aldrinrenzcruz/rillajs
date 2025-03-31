function $(selector) {
  return $select(document, selector);
}

Element.prototype.$ = function (selector) {
  return $select(this, selector);
};

function $select(context, selector) {
  if (typeof selector !== "string" || !selector.trim()) {
    console.error(`$: invalid selector "${selector}"`);
    return null;
  }

  if (!(context instanceof Element) && context !== document) {
    console.error(`$: invalid context`, context);
    return null;
  }

  let elements;

  try {
    elements = context.querySelectorAll(selector);
  } catch (error) {
    console.error(`$: invalid selector "${selector}"`, error);
    return null;
  }

  if (!elements.length) {
    console.error(`$: ${selector} not found.`);
    return null;
  }

  if (selector.startsWith("#") && elements.length > 1) {
    console.warn(`$: (${elements.length}) ${selector} elements found.`);
    return elements[0];
  }

  return elements.length === 1 ? elements[0] : elements;
}

function $id(id, error_log = true) {
  if (typeof id !== "string" || !id.trim()) {
    console.error(`$id: invalid id "${id}"`);
    return null;
  }
  const element = document.getElementById(id);
  if (!element && error_log) {
    console.error(`$id: #"${id}" not found.`);
  }
  return element;
}

Element.prototype.$this = function (callback) {
  if (typeof callback === "function") {
    callback(this);
  }
  return this;
};

NodeList.prototype.$this = function (callback) {
  if (typeof callback === "function") {
    this.forEach(el => callback(el));
  }
  return this;
};

window.$create = function (tagName) {
  if (!tagName || typeof tagName !== "string") {
    console.error("$create: invalid tag name");
    return null;
  }
  return document.createElement(tagName);
};

Element.prototype.$prepend = function (htmlString) {
  if (!htmlString) {
    console.error("$prepend: invalid parameter");
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
    console.error("$append: invalid parameter");
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
    console.error("$paint: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

Element.prototype.wrap = function (content) {
  const temp = document.createElement("div");
  temp.innerHTML = content;
  const wrapper = temp.firstElementChild;
  if (!wrapper) {
    console.error("$wrap: invalid argument");
    return this;
  }
  const parent = this.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, this);
    wrapper.appendChild(this);
  }
  return this;
};

NodeList.prototype.wrap = HTMLCollection.prototype.wrap = function (content) {
  const elements = Array.from(this);
  elements.forEach(element => {
    if (element instanceof Element) {
      element.wrap(content);
    }
  });
  return this;
};

Element.prototype.unwrap = function () {
  const parent = this.parentNode;
  if (!parent || parent === document.documentElement) {
    return this;
  }
  const grandparent = parent.parentNode;
  if (grandparent) {
    grandparent.insertBefore(this, parent);
    let onlyWhitespaceLeft = true;
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i];
      if (node.nodeType !== 3 || node.nodeValue.trim() !== '') {
        onlyWhitespaceLeft = false;
        break;
      }
    }
    if (parent.childNodes.length === 0 || onlyWhitespaceLeft) {
      grandparent.removeChild(parent);
    }
  }
  return this;
};

NodeList.prototype.unwrap = function () {
  const elements = Array.from(this);
  const parents = new Set();
  elements.forEach(element => {
    if (element instanceof Element) {
      const parent = element.parentNode;
      if (parent && parent !== document.documentElement) {
        parents.add(parent);
        const grandparent = parent.parentNode;
        if (grandparent) {
          grandparent.insertBefore(element, parent);
        }
      }
    }
  });
  parents.forEach(parent => {
    let onlyWhitespaceLeft = true;
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i];
      if (node.nodeType !== 3 || node.nodeValue.trim() !== '') {
        onlyWhitespaceLeft = false;
        break;
      }
    }
    if (parent.childNodes.length === 0 || onlyWhitespaceLeft) {
      parent.parentNode?.removeChild(parent);
    }
  });
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

Element.prototype.val = function (content) {
  if (content === undefined) return this.value;
  this.value = content;
  return this;
};

Element.prototype.$attr = function (name, value) {
  if (value === undefined) return this.getAttribute(name);
  this.setAttribute(name, value);
  return this;
};

NodeList.prototype.$attr = function (name, value) {
  if (value === undefined) {
    return Array.from(this).map(el => el.$attr(name));
  }
  this.forEach(el => el.$attr(name, value));
  return this;
};

Element.prototype.$class = function (classNames) {
  if (classNames === undefined) {
    return Array.from(this.classList);
  }
  if (typeof classNames !== "string") {
    console.error("$class: input must be a string");
    return this;
  }
  try {
    if (classNames === "") {
      this.removeAttribute("class");
      return this;
    }
    const classes = classNames.trim().split(/\s+/).filter(cls => cls);
    this.className = "";
    if (classes.length > 0) {
      this.classList.add(...classes);
    }
  } catch (error) {
    console.error("$class: error setting classes", error);
  }
  return this;
};

NodeList.prototype.$class = function (classNames) {
  if (classNames === undefined) {
    return Array.from(this).map(element => Array.from(element.classList));
  }
  if (typeof classNames !== "string") {
    console.error("$class: input must be a string");
    return this;
  }
  try {
    if (classNames === "") {
      this.forEach(element => {
        element.removeAttribute("class");
      });
      return this;
    }
    const classes = classNames.trim().split(/\s+/).filter(cls => cls);
    this.forEach(element => {
      element.className = "";
      if (classes.length > 0) {
        element.classList.add(...classes);
      }
    });
  } catch (error) {
    console.error("$class: error setting classes", error);
  }
  return this;
};

Element.prototype.addClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("addClass: input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("addClass: no valid classes provided");
    return this;
  }

  try {
    this.classList.add(...classes);
  } catch (error) {
    console.error("addClass: error adding classes", error);
  }

  return this;
};

Element.prototype.removeClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("removeClass: input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("removeClass: no valid classes provided");
    return this;
  }

  try {
    this.classList.remove(...classes);
  } catch (error) {
    console.error("removeClass: error removing classes", error);
  }

  return this;
};

Element.prototype.toggleClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("toggleClass: input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("toggleClass: no valid classes provided");
    return this;
  }

  try {
    classes.forEach(cls => this.classList.toggle(cls));
  } catch (error) {
    console.error("toggleClass: error toggling classes", error);
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
  if (value === undefined) {
    try {
      return JSON.parse(store.getItem(key));
    } catch (e) {
      return store.getItem(key);
    }
  }
  if (value === null) return store.removeItem(key);
  store.setItem(key, JSON.stringify(value));
};

const $local = (key, value) => storage("local", key, value);
const $session = (key, value) => storage("session", key, value);

function $getElement(param) {
  return typeof param === "string" ? document.querySelector(`#${param}`) : param;
}

function show(param, displayType = "block") {
  const element = $getElement(param);
  if (element) {
    element.style.display = displayType;
    return element;
  } else {
    console.warn("show: element not found");
    return null;
  }
}

function hide(param) {
  const element = $getElement(param);
  if (element) {
    element.style.display = "none";
    return element;
  } else {
    console.warn("hide: element not found");
    return null;
  }
}

function toggle(param, displayType = "block") {
  const element = $getElement(param);
  if (element) {
    if (window.getComputedStyle(element).display === "none") {
      show(element, displayType);
    } else {
      hide(element);
    }
    return element;
  } else {
    console.warn("toggle: element not found");
    return null;
  }
}

function fadeIn(param, displayType = "block", duration = 200) {
  const element = $getElement(param);
  if (element) {
    element.style.opacity = 0;
    element.style.display = displayType;
    requestAnimationFrame(function () {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 1;
    });
    return element;
  } else {
    console.warn("fadeIn: element not found");
    return null;
  }
}

function fadeOut(param, duration = 200) {
  const element = $getElement(param);
  if (element) {
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;

    setTimeout(function () {
      element.style.display = "none";
    }, duration);

    return element;
  } else {
    console.warn("fadeOut: element not found");
    return null;
  }
}

function fadeToggle(param, displayType = "block", duration = 200) {
  const element = $getElement(param);
  if (element) {
    if (window.getComputedStyle(element).display === "none") {
      fadeIn(element, displayType, duration);
    } else {
      fadeOut(element, duration);
    }
    return element;
  } else {
    console.warn("fadeToggle: element not found");
    return null;
  }
}

// HTMLElement.prototype.show = function (displayType = "block") {
//   show(this, displayType);
//   return this;
// };

// HTMLElement.prototype.hide = function () {
//   hide(this);
//   return this;
// };

// HTMLElement.prototype.toggle = function (displayType = "block") {
//   toggle(this, displayType);
//   return this;
// };

// HTMLElement.prototype.fadeIn = function (displayType = "block") {
//   fadeIn(this, displayType);
//   return this;
// };

// HTMLElement.prototype.fadeOut = function () {
//   fadeOut(this);
//   return this;
// };

// HTMLElement.prototype.fadeToggle = function (displayType = "block") {
//   fadeToggle(this, displayType);
//   return this;
// };

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
    var headerItems = element.querySelectorAll(".draggable-handle");

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
  sheet.insertRule(".draggable-handle { cursor: grab; z-index: 1; }", sheet.cssRules.length);
})();

// (function () {
//   const sheet = new CSSStyleSheet();
//   sheet.insertRule(".draggable { position: absolute; overflow: hidden; z-index: 1; }");
//   sheet.insertRule(".draggable-handle { cursor: grab; z-index: 1; }");

//   document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
// })();
