function $(selector) {
  return $select(document, selector);
}

Element.prototype.$ = function (selector) {
  return $select(this, selector);
};

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

window.$create = function (tagName) {
  if (!tagName || typeof tagName !== "string") {
    console.error("$create: invalid tag name");
    return null;
  }
  return document.createElement(tagName);
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

Element.prototype.html = function (content) {
  if (content === undefined) return this.innerHTML;
  this.innerHTML = content;
  return this;
};

Element.prototype.parent = function () {
  return this.parentNode;
};

Element.prototype.text = function (content) {
  if (content === undefined) return this.textContent;
  this.textContent = content;
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

Element.prototype.val = function (content) {
  if (content === undefined) return this.value;
  this.value = content;
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

function $dom(callback) {
  document.addEventListener("DOMContentLoaded", callback);
}

const $rillaEvents = new WeakMap();


function $window(callback) {
  window.addEventListener("load", callback);
}

Element.prototype.off = function (event, handler) {
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
    if (!$rillaEvents.has(this)) {
      $rillaEvents.set(this, new Map());
    }

    // Get the handlers map for this element
    const handlers = $rillaEvents.get(this);

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

Element.prototype.prevent = function () {
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

Element.prototype.hasClass = function (className) {
  if (className === undefined || className === "") {
    return this.classList.length > 0;
  }
  if (typeof className !== "string") {
    console.error("hasClass: Input must be a string");
    return false;
  }
  try {
    return this.classList.contains(className.trim());
  } catch (error) {
    console.error("hasClass: Error checking classes", error);
    return false;
  }
};

NodeList.prototype.hasClass = function (className) {
  if (className === undefined || className === "") {
    return Array.from(this).some(element => element.classList.length > 0);
  }
  if (typeof className !== "string") {
    console.error("hasClass: Input must be a string");
    return false;
  }
  try {
    return Array.from(this).some(element => element.classList.contains(className.trim()));
  } catch (error) {
    console.error("hasClass: Error checking classes", error);
    return false;
  }
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

function $local(key, value) {
  return $rillaStore("local", key, value);
}

const $rillaStore = (type, key, value) => {
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

function $session(key, value) {
  return $rillaStore("session", key, value);
}

function fadeIn(param, displayType = "block", duration = 200) {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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

function hide(param) {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
  if (element) {
    element.style.display = "none";
    return element;
  } else {
    console.warn("hide: element not found");
    return null;
  }
}

function show(param, displayType = "block") {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
  if (element) {
    element.style.display = displayType;
    return element;
  } else {
    console.warn("show: element not found");
    return null;
  }
}

function toggle(param, displayType = "block") {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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

function $initDragging() {
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
$initDragging();

(function () {
  const style = document.createElement("style");
  document.head.appendChild(style);
  const sheet = style.sheet;

  sheet.insertRule(".draggable { position: absolute; overflow: hidden; z-index: 1; }", sheet.cssRules.length);
  sheet.insertRule(".draggable-handle { cursor: grab; z-index: 1; }", sheet.cssRules.length);
})();