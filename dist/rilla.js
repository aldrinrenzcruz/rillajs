window.$error = console.error.bind(console);

window.$log = console.log.bind(console);

window.$warn = console.warn.bind(console);

function $(selector) {
  return $select(document, selector);
}

Element.prototype.$ = function (selector) {
  return $select(this, selector);
};

// Conflicting with Element.prototype
// window.$ = function (selector) {
//   return $select(document, selector);
// };

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

NodeList.prototype.$append = function (htmlString) {
  if (!htmlString) {
    console.error("$append: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$append(htmlString);
    }
  });
  return this;
};

window.$create = function (tagName) {
  if (!tagName || typeof tagName !== "string") {
    console.error("$create: invalid tag name");
    return null;
  }
  return document.createElement(tagName);
};

Element.prototype.$html = function (content) {
  if (content === undefined) {
    return this.innerHTML;
  }
  this.innerHTML = content;
  return this;
};

NodeList.prototype.$html = function (content) {
  if (content === undefined) {
    return Array.from(this).map(el => el.innerHTML);
  }
  for (let i = 0; i < this.length; i++) {
    this[i].innerHTML = content;
  }
  return this;
};

Element.prototype.outer = function (content) {
  if (content === undefined) {
    return this.outerHTML;
  }
  this.outerHTML = content;
  return this;
};

NodeList.prototype.outer = function (content) {
  if (content === undefined) {
    return Array.from(this).map(el => el.outerHTML);
  }
  for (let i = 0; i < this.length; i++) {
    this[i].outerHTML = content;
  }
  return this;
};

Element.prototype.$paint = function (htmlString) {
  this.innerHTML = "";
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

NodeList.prototype.$paint = function (htmlString) {
  this.forEach(element => {
    if (element instanceof Element) {
      element.$paint(htmlString);
    }
  });
  return this;
};

Element.prototype.$parent = function () {
  return this.parentNode;
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

NodeList.prototype.$prepend = function (htmlString) {
  if (!htmlString) {
    console.error("$prepend: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$prepend(htmlString);
    }
  });
  return this;
};

Element.prototype.$remove = function () {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
  return this;
};

NodeList.prototype.$remove = function () {
  Array.prototype.forEach.call(this, function (el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  return this;
};

// This expects either $create or a tag name, doesnt have to be valid
Element.prototype.$replace = function (el) {
  if (typeof el === "string") {
    const div = document.createElement("div");
    div.innerHTML = el.trim();
    el = div.firstChild;
  }
  this.parentNode.replaceChild(el, this);
  return el;
};

NodeList.prototype.$replace = function (el) {
  if (this.length > 0) {
    let first = this[0];
    let replaced = [];
    first.parentNode.replaceChild(el, first);
    replaced.push(el);
    for (let i = 1; i < this.length; i++) {
      if (this[i].parentNode) {
        let clone = el.cloneNode(true);
        this[i].parentNode.replaceChild(clone, this[i]);
        replaced.push(clone);
      }
    }
    return replaced.length === 1 ? replaced[0] : replaced;
  }
  return null;
};

Element.prototype.$text = function (content) {
  if (content === undefined) {
    return this.textContent;
  }
  this.textContent = content;
  return this;
};

NodeList.prototype.$text = function (content) {
  if (content === undefined) {
    return Array.from(this).map(el => el.textContent);
  }
  for (let i = 0; i < this.length; i++) {
    this[i].textContent = content;
  }
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

Element.prototype.$unwrap = function () {
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

NodeList.prototype.$unwrap = function () {
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

Element.prototype.$value = function (content) {
  if (content === undefined) {
    return this.value;
  }
  this.value = content;
  return this;
};

NodeList.prototype.$value = function (content) {
  if (content === undefined) {
    return Array.from(this).map(el => "value" in el ? el.value : null);
  }
  for (let i = 0; i < this.length; i++) {
    if ("value" in this[i]) {
      this[i].value = content;
    }
  }
  return this;
};

// Expects a pair of HTML element
Element.prototype.$wrap = function (content) {
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

NodeList.prototype.$wrap = function (content) {
  return Array.from(this).map(el => {
    if (el instanceof Element) {
      return el.wrap(content);
    }
    return el;
  });
};

function $dom(callback) {
  document.addEventListener("DOMContentLoaded", callback);
}

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

Element.prototype.$on = function (event, handler) {
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

NodeList.prototype.$on = function (event, handler) {
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
      element.$on(event, handler);
    });
  } catch (error) {
    console.error(`on: Error adding '${event}' event listener to NodeList`, error);
  }

  return this;
};

Element.prototype.$prevent = function () {
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

NodeList.prototype.$prevent = function () {
  try {
    this.forEach(element => {
      element.$prevent();
    });
  } catch (error) {
    console.error("prevent: Error adding preventDefault to NodeList", error);
  }

  return this;
};

const $rillaEvents = new WeakMap();

Element.prototype.$stop = function () {
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

NodeList.prototype.$stop = function () {
  try {
    this.forEach(element => {
      element.$stop();
    });
  } catch (error) {
    console.error("stop: Error adding stopPropagation to NodeList", error);
  }

  return this;
};

function $window(callback) {
  window.addEventListener("load", callback);
}

Element.prototype.$addClass = function (classNames) {
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

NodeList.prototype.$addClass = function (classNames) {
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
    this.forEach(element => {
      element.classList.add(...classes);
    });
  } catch (error) {
    console.error("addClass: error adding classes", error);
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
    console.error("class: input must be a string");
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
    console.error("class: error setting classes", error);
  }
  return this;
};

NodeList.prototype.$class = function (classNames) {
  if (classNames === undefined) {
    return Array.from(this).map(element => Array.from(element.classList));
  }
  if (typeof classNames !== "string") {
    console.error("class: input must be a string");
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
    console.error("class: error setting classes", error);
  }
  return this;
};

Element.prototype.$data = function (key, value) {
  // Case 1: No parameters - get all data attributes
  if (arguments.length === 0) {
    const dataAttributes = {};
    Array.from(this.attributes)
      .filter(attr => attr.name.startsWith('data-'))
      .forEach(attr => {
        const keyName = attr.name.slice(5);
        dataAttributes[keyName] = attr.value;
      });
    return dataAttributes;
  }
  // Case 2: Empty string parameter - remove all data attributes
  if (key === "" && arguments.length === 1) {
    const dataAttrs = Array.from(this.attributes)
      .filter(attr => attr.name.startsWith('data-'))
      .map(attr => attr.name);
    dataAttrs.forEach(attrName => {
      this.removeAttribute(attrName);
    });
    return this;
  }
  // Convert key to data-attribute format
  const dataKey = `data-${key}`;
  // Case 3: Get specific data attribute value
  if (arguments.length === 1) {
    return this.getAttribute(dataKey);
  }
  // Case 4: Set specific data attribute value
  if (value === "") {
    this.removeAttribute(dataKey);
  } else {
    this.setAttribute(dataKey, value);
  }
  return this;
};

NodeList.prototype.$data = function (key, value) {
  if (arguments.length === 0) {
    return Array.from(this).map(element => {
      if (element instanceof Element) {
        return element.$data();
      }
      return null;
    });
  }
  Array.from(this).forEach(element => {
    if (element instanceof Element) {
      Element.prototype.$data.apply(element, arguments);
    }
  });
  return this;
};

Element.prototype.$hasClass = function (className) {
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

NodeList.prototype.$hasClass = function (className) {
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

Element.prototype.$removeClass = function (classNames) {
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

NodeList.prototype.$removeClass = function (classNames) {
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
    this.forEach(element => {
      element.classList.remove(...classes);
    });
  } catch (error) {
    console.error("removeClass: error removing classes", error);
  }
  return this;
};

Element.prototype.$toggleClass = function (classNames) {
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

NodeList.prototype.$toggleClass = function (classNames) {
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
    this.forEach(element => {
      classes.forEach(cls => element.classList.toggle(cls));
    });
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

function $fadeIn(param, displayType = "block", duration = 200) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.opacity = 0;
      element.style.display = displayType;
      requestAnimationFrame(function () {
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = 1;
      });
      return element;
    } else {
      console.warn(`fadeIn: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("fadeIn: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      element.style.opacity = 0;
      element.style.display = displayType;
      (function (el) {
        requestAnimationFrame(function () {
          el.style.transition = `opacity ${duration}ms`;
          el.style.opacity = 1;
        });
      })(element);
    }
    return param;
  }
  if (param && param.style) {
    param.style.opacity = 0;
    param.style.display = displayType;
    requestAnimationFrame(function () {
      param.style.transition = `opacity ${duration}ms`;
      param.style.opacity = 1;
    });
    return param;
  }
  console.warn("fadeIn: element not found or invalid");
  return null;
}

Element.prototype.$fadeIn = function (displayType = "block", duration = 200) {
  this.style.opacity = 0;
  this.style.display = displayType;
  const element = this;
  requestAnimationFrame(function () {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 1;
  });

  return this;
};

NodeList.prototype.$fadeIn = function (displayType = "block", duration = 200) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    element.style.opacity = 0;
    element.style.display = displayType;
    (function (el) {
      requestAnimationFrame(function () {
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = 1;
      });
    })(element);
  }
  return this;
};

function $fadeOut(param, duration = 200) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.opacity = 1;
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;

      setTimeout(function () {
        element.style.display = "none";
      }, duration);

      return element;
    } else {
      console.warn(`fadeOut: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("fadeOut: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      element.style.opacity = 1;
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;
      (function (el) {
        setTimeout(function () {
          el.style.display = "none";
        }, duration);
      })(element);
    }
    return param;
  }
  if (param && param.style) {
    param.style.opacity = 1;
    param.style.transition = `opacity ${duration}ms`;
    param.style.opacity = 0;
    setTimeout(function () {
      param.style.display = "none";
    }, duration);
    return param;
  }
  console.warn("fadeOut: element not found or invalid");
  return null;
}

Element.prototype.$fadeOut = function (duration = 200) {
  this.style.opacity = 1;
  this.style.transition = `opacity ${duration}ms`;
  this.style.opacity = 0;

  const element = this;
  setTimeout(function () {
    element.style.display = "none";
  }, duration);

  return this;
};

NodeList.prototype.$fadeOut = function (duration = 200) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;
    (function (el) {
      setTimeout(function () {
        el.style.display = "none";
      }, duration);
    })(element);
  }

  return this;
};

function $fadeToggle(param, displayType = "block", duration = 200) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      if (window.getComputedStyle(element).display === "none") {
        $fadeIn(element, displayType, duration);
      } else {
        $fadeOut(element, duration);
      }
      return element;
    } else {
      console.warn(`fadeToggle: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("fadeToggle: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      if (window.getComputedStyle(element).display === "none") {
        element.style.opacity = 0;
        element.style.display = displayType;
        (function (el) {
          requestAnimationFrame(function () {
            el.style.transition = `opacity ${duration}ms`;
            el.style.opacity = 1;
          });
        })(element);
      } else {
        element.style.opacity = 1;
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = 0;
        (function (el) {
          setTimeout(function () {
            el.style.display = "none";
          }, duration);
        })(element);
      }
    }
    return param;
  }
  if (param && param.style) {
    if (window.getComputedStyle(param).display === "none") {
      $fadeIn(param, displayType, duration);
    } else {
      $fadeOut(param, duration);
    }
    return param;
  }
  console.warn("fadeToggle: element not found or invalid");
  return null;
}

Element.prototype.$fadeToggle = function (displayType = "block", duration = 200) {
  if (window.getComputedStyle(this).display === "none") {
    this.$fadeIn(displayType, duration);
  } else {
    this.$fadeOut(duration);
  }
  return this;
};

NodeList.prototype.$fadeToggle = function (displayType = "block", duration = 200) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (window.getComputedStyle(element).display === "none") {
      element.style.opacity = 0;
      element.style.display = displayType;
      (function (el) {
        requestAnimationFrame(function () {
          el.style.transition = `opacity ${duration}ms`;
          el.style.opacity = 1;
        });
      })(element);
    } else {
      element.style.opacity = 1;
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;
      (function (el) {
        setTimeout(function () {
          el.style.display = "none";
        }, duration);
      })(element);
    }
  }
  return this;
};

function $hide(param) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.display = "none";
      return element;
    } else {
      console.warn(`hide: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("hide: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      param[i].style.display = "none";
    }
    return param;
  }
  if (param && param.style) {
    param.style.display = "none";
    return param;
  }
  console.warn("hide: element not found or invalid");
  return null;
}

Element.prototype.$hide = function () {
  this.style.display = "none";
  return this;
};

NodeList.prototype.$hide = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = "none";
  }
  return this;
};

function $show(param, displayType = "block") {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.display = displayType;
      return element;
    } else {
      console.warn(`show: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("show: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      param[i].style.display = displayType;
    }
    return param;
  }
  if (param && param.style) {
    param.style.display = displayType;
    return param;
  }
  console.warn("show: element not found or invalid");
  return null;
}

Element.prototype.$show = function (displayType = "block") {
  this.style.display = displayType;
  return this;
};

NodeList.prototype.$show = function (displayType = "block") {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = displayType;
  }
  return this;
};

function $toggle(param, displayType = "block") {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      if (window.getComputedStyle(element).display === "none") {
        $show(element, displayType);
      } else {
        $hide(element);
      }
      return element;
    } else {
      console.warn(`toggle: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("toggle: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      if (window.getComputedStyle(element).display === "none") {
        element.style.display = displayType;
      } else {
        element.style.display = "none";
      }
    }
    return param;
  }
  if (param && param.style) {
    if (window.getComputedStyle(param).display === "none") {
      $show(param, displayType);
    } else {
      $hide(param);
    }
    return param;
  }
  console.warn("toggle: element not found or invalid");
  return null;
}

Element.prototype.$toggle = function (displayType = "block") {
  if (window.getComputedStyle(this).display === "none") {
    this.style.display = displayType;
  } else {
    this.style.display = "none";
  }
  return this;
};

NodeList.prototype.$toggle = function (displayType = "block") {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (window.getComputedStyle(element).display === "none") {
      element.style.display = displayType;
    } else {
      element.style.display = "none";
    }
  }
  return this;
};

$window(() => {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var popups = document.getElementsByClassName("draggable");
  var elmnt = null;
  var currentZIndex = 1;
  for (var i = 0; i < popups.length; i++) {
    var popup = popups[i];
    var header = getHeader(popup);
    popup.onmousedown = function () {
      this.style.zIndex = "" + ++currentZIndex;
    };
    if (header) {
      header.parentPopup = popup;
      header.onmousedown = dragMouseDown;
    }
  }
  function dragMouseDown(e) {
    elmnt = this.parentPopup;
    elmnt.style.zIndex = "" + ++currentZIndex;
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
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
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
  function getHeader(element) {
    var headerItems = element.getElementsByClassName("drag-handle");
    if (headerItems.length === 1) {
      return headerItems[0];
    }
    return null;
  }
})

