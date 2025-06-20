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

// option 2. Explicitly assign to window to ensure accessibility in HTML event handlers
// window.$ = $;

function $select(context, el) {
  if (typeof el !== "string" || !el.trim()) {
    console.warn(`$: invalid selector "${el}"`);
    return null;
  }

  if (!(context instanceof Element) && context !== document) {
    console.warn(`$: invalid context`, context);
    return null;
  }

  let elements;

  try {
    elements = context.querySelectorAll(el);
  } catch (error) {
    console.warn(`$: invalid selector "${el}"`, error);
    return null;
  }

  if (!elements.length) {
    console.warn(`$: ${el} not found.`);
    return null;
  }

  if (el.startsWith("#") && elements.length > 1) {
    console.warn(`$: (${elements.length}) ${el} elements found.`);
    return elements[0];
  }

  return elements.length === 1 ? elements[0] : elements;
}

function $getElement(element) {
  return typeof element === "string" ? document.querySelector(element) : element;
}

Element.prototype.$children = function (level = 1) {
  let current = [this];
  for (let i = 0; i < level; i++) {
    current = current.flatMap(el => Array.from(el.children));
    if (current.length === 0) {
      return null;
    }
  }
  return current;
};

NodeList.prototype.$children = function (level = 1) {
  const results = Array.from(this).flatMap(el => el.$children(level));
  return results.length > 0 ? results : null;
};

Element.prototype.$parent = function(level = 1) {
  let parent = this;
  for (let i = 0; i < level; i++) {
    if (parent.parentNode) {
      parent = parent.parentNode;
    } else {
      return null;
    }
  }
  return parent;
};

NodeList.prototype.$parent = function(level = 1) {
  return Array.from(this).map(el => el.$parent(level));
};

Element.prototype.$siblings = function () {
  return Array.from(this.parentNode.children).filter(el => el !== this);
};

NodeList.prototype.$siblings = function () {
  return Array.from(this).map(el =>
    Array.from(el.parentNode.children).filter(child => child !== el)
  );
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

Element.prototype.$after = function (htmlString) {
  if (!htmlString) {
    console.warn("$after: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.parentNode?.insertBefore(fragment, this.nextSibling);
  return this;
};

NodeList.prototype.$after = function (htmlString) {
  if (!htmlString) {
    console.warn("$after: invalid parameter");
    return this;
  }
  Array.from(this).forEach(el => {
    if (el instanceof Element) {
      el.$after(htmlString);
    }
  });
  return this;
};

Element.prototype.$append = function (htmlString) {
  if (!htmlString) {
    console.warn("$append: invalid parameter");
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
    console.warn("$append: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$append(htmlString);
    }
  });
  return this;
};

Element.prototype.$before = function (htmlString) {
  if (!htmlString) {
    console.warn("$before: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.parentNode?.insertBefore(fragment, this);
  return this;
};

NodeList.prototype.$before = function (htmlString) {
  if (!htmlString) {
    console.warn("$before: invalid parameter");
    return this;
  }
  Array.from(this).forEach(el => {
    if (el instanceof Element) {
      el.$before(htmlString);
    }
  });
  return this;
};

Element.prototype.$inner = function (content) {
  if (content === undefined) {
    return this.innerHTML;
  }
  this.innerHTML = content;
  return this;
};

NodeList.prototype.$inner = function (content) {
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

Element.prototype.$prepend = function (htmlString) {
  if (!htmlString) {
    console.warn("$prepend: invalid parameter");
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
    console.warn("$prepend: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$prepend(htmlString);
    }
  });
  return this;
};

Element.prototype.$replace = function (htmlString) {
  if (!htmlString) {
    console.warn("$replace: invalid parameter");
    return this;
  }
  this.innerHTML = '';
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

NodeList.prototype.$replace = function (htmlString) {
  if (!htmlString) {
    console.warn("$replace: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$replace(htmlString);
    }
  });
  return this;
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

Element.prototype.$unwrap = function () {
  const parent = this.parentNode;
  if (!parent || parent === document.documentElement || parent === document.body) {
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
      element.$unwrap();
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

Element.prototype.$wrap = function (content) {
  const temp = document.createElement("div");
  temp.innerHTML = content;
  const wrapper = temp.firstElementChild;
  if (!wrapper) {
    console.warn("$wrap: invalid argument");
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
      return el.$wrap(content);
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

    console.warn("off: Invalid arguments");
  } catch (error) {
    console.warn("off: Error removing event listener(s)", error);
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
    console.warn("off: Error removing event listener(s) from NodeList", error);
  }

  return this;
};

Element.prototype.$on = function (event, handler) {
  if (typeof event !== "string") {
    console.warn("on: Event type must be a string");
    return this;
  }

  if (typeof handler !== "function") {
    console.warn("on: Handler must be a function");
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
    console.warn(`on: Error adding '${event}' event listener`, error);
  }

  return this;
};

NodeList.prototype.$on = function (event, handler) {
  if (typeof event !== "string") {
    console.warn("on: Event type must be a string");
    return this;
  }

  if (typeof handler !== "function") {
    console.warn("on: Handler must be a function");
    return this;
  }

  try {
    this.forEach(element => {
      element.$on(event, handler);
    });
  } catch (error) {
    console.warn(`on: Error adding '${event}' event listener to NodeList`, error);
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
    console.warn("prevent: Error adding preventDefault", error);
  }

  return this;
};

NodeList.prototype.$prevent = function () {
  try {
    this.forEach(element => {
      element.$prevent();
    });
  } catch (error) {
    console.warn("prevent: Error adding preventDefault to NodeList", error);
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
    console.warn("stop: Error adding stopPropagation", error);
  }

  return this;
};

NodeList.prototype.$stop = function () {
  try {
    this.forEach(element => {
      element.$stop();
    });
  } catch (error) {
    console.warn("stop: Error adding stopPropagation to NodeList", error);
  }

  return this;
};

function $window(callback) {
  window.addEventListener("load", callback);
}

Element.prototype.$addClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.warn("addClass: input must be a string");
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
    console.warn("addClass: error adding classes", error);
  }
  return this;
};

NodeList.prototype.$addClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.warn("addClass: input must be a string");
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
    console.warn("addClass: error adding classes", error);
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
    console.warn("class: input must be a string");
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
    console.warn("class: error setting classes", error);
  }
  return this;
};

NodeList.prototype.$class = function (classNames) {
  if (classNames === undefined) {
    return Array.from(this).map(element => Array.from(element.classList));
  }
  if (typeof classNames !== "string") {
    console.warn("class: input must be a string");
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
    console.warn("class: error setting classes", error);
  }
  return this;
};

Element.prototype.$css = function (property, value) {
  if (typeof property === "string") {
    if (value === undefined) {
      return window.getComputedStyle(this).getPropertyValue(property);
    } else if (typeof value === "function") {
      let currentValue = window.getComputedStyle(this).getPropertyValue(property);
      this.style[property] = value(this, currentValue);
    } else {
      this.style[property] = value;
    }
  } else if (typeof property === "object") {
    for (let key in property) {
      let val = property[key];
      this.style[key] = typeof val === "function" ? val(this, window.getComputedStyle(this).getPropertyValue(key)) : val;
    }
  }
  return this;
};

NodeList.prototype.$css = function (property, value) {
  if (typeof property === "string" && value === undefined) {
    return Array.from(this).map(el => el.$css(property));
  }
  Array.from(this).forEach(el => el.$css(property, value));
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
    console.warn("hasClass: Input must be a string");
    return false;
  }
  try {
    return this.classList.contains(className.trim());
  } catch (error) {
    console.warn("hasClass: Error checking classes", error);
    return false;
  }
};

NodeList.prototype.$hasClass = function (className) {
  if (className === undefined || className === "") {
    return Array.from(this).some(element => element.classList.length > 0);
  }
  if (typeof className !== "string") {
    console.warn("hasClass: Input must be a string");
    return false;
  }
  try {
    return Array.from(this).some(element => element.classList.contains(className.trim()));
  } catch (error) {
    console.warn("hasClass: Error checking classes", error);
    return false;
  }
};

Element.prototype.$removeClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.warn("removeClass: input must be a string");
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
    console.warn("removeClass: error removing classes", error);
  }
  return this;
};

NodeList.prototype.$removeClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.warn("removeClass: input must be a string");
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
    console.warn("removeClass: error removing classes", error);
  }
  return this;
};

Element.prototype.$toggleClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.warn("toggleClass: input must be a string");
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
    console.warn("toggleClass: error toggling classes", error);
  }
  return this;
};

NodeList.prototype.$toggleClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.warn("toggleClass: input must be a string");
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
    console.warn("toggleClass: error toggling classes", error);
  }
  return this;
};

function $toKebabCase(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

String.prototype.$toKebabCase = function () {
  return $toKebabCase(this);
};

function $toSentenceCase(s) {
  if (!s) return "";
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

String.prototype.$toSentenceCase = function () {
  return $toSentenceCase(this);
};

function $toTitleCase(inputString, capitalizeMinorWords = false) {
  const minorWords = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|per|so|the|to|up|via|vs\.?|yet)$/i;

  if (!inputString) return '';

  return inputString.toLowerCase()
    .replace(/\b\w+\b/g, (word, index) => {
      // Always capitalize first word, or if capitalizeMinorWords is true, or if not a minor word
      if (index === 0 || capitalizeMinorWords || !minorWords.test(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    // Keep possessive forms lowercase
    .replace(/([a-z])'s\b/gi, possessiveMatch => {
      return possessiveMatch.toLowerCase();
    })
    // Capitalize words after hyphens in compound words
    .replace(/(?<=\w)-\w/g, hyphenatedMatch => {
      return hyphenatedMatch.toUpperCase();
    });
}

String.prototype.$toTitleCase = function (capitalizeMinorWords = false) {
  return $toTitleCase(this, capitalizeMinorWords);
};

function $truncate(text, length, trim = true) {
  let truncated = text.slice(0, length);
  return (trim ? truncated.replace(/[^\w]+$/, "") : truncated) + "...";
}

String.prototype.$truncate = function (length, trim = true) {
  return $truncate(this, length, trim);
};

function $shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

Array.prototype.$shuffle = function () {
  return $shuffle(this);
};

window.addEventListener("load", function () {
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
});

function $hideElement(element, duration) {
  if (duration > 0) {
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;
    setTimeout(function () {
      element.style.display = "none";
    }, duration);
  } else {
    element.style.display = "none";
  }
}

function $hide(param, duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(param);
    if (element) {
      $hideElement(element, duration);
      return element;
    } else {
      return null;
    }
  }

  if (param instanceof NodeList) {
    if (param.length === 0) {
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      $hideElement(param[i], duration);
    }
    return param;
  }

  if (param && param.style) {
    $hideElement(param, duration);
    return param;
  }
  return null;
}

Element.prototype.$hide = function (duration = 0) {
  $hideElement(this, duration);
  return this;
};

NodeList.prototype.$hide = function (duration = 0) {
  for (let i = 0; i < this.length; i++) {
    $hideElement(this[i], duration);
  }
  return this;
};

function $showElement(element, displayType, duration) {
  if (duration > 0) {
    element.style.opacity = 0;
    element.style.display = displayType;
    requestAnimationFrame(function () {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 1;
    });
  } else {
    element.style.display = displayType;
  }
}

function $show(param, displayType = "block", duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(param);
    if (element) {
      $showElement(element, displayType, duration);
      return element;
    } else {
      return null;
    }
  }

  if (param instanceof NodeList) {
    if (param.length === 0) {
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      $showElement(param[i], displayType, duration);
    }
    return param;
  }

  if (param && param.style) {
    $showElement(param, displayType, duration);
    return param;
  }
  return null;
}

Element.prototype.$show = function (displayType = "block", duration = 0) {
  $showElement(this, displayType, duration);
  return this;
};

NodeList.prototype.$show = function (displayType = "block", duration = 0) {
  for (let i = 0; i < this.length; i++) {
    $showElement(this[i], displayType, duration);
  }
  return this;
};

function $toggleElement(element, displayType, duration) {
  if (window.getComputedStyle(element).display === "none") {
    $showElement(element, displayType, duration);
  } else {
    $hideElement(element, duration);
  }
}

function $toggle(param, displayType = "block", duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(param);
    if (element) {
      $toggleElement(element, displayType, duration);
      return element;
    } else {
      return null;
    }
  }

  if (param instanceof NodeList) {
    if (param.length === 0) {
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      $toggleElement(param[i], displayType, duration);
    }
    return param;
  }

  if (param && param.style) {
    $toggleElement(param, displayType, duration);
    return param;
  }
  return null;
}

Element.prototype.$toggle = function (displayType = "block", duration = 0) {
  $toggleElement(this, displayType, duration);
  return this;
};

NodeList.prototype.$toggle = function (displayType = "block", duration = 0) {
  for (let i = 0; i < this.length; i++) {
    $toggleElement(this[i], displayType, duration);
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

function $hash(value) {
  if (value === undefined) {
    return window.location.hash.slice(1);
  } else {
    window.location.hash = value;
    return value;
  }
}

function $param(key, value) {
  const params = new URLSearchParams(window.location.search);
  if (value === undefined) {
    return params.get(key);
  } else {
    params.set(key, value);
    const newUrl = window.location.pathname + '?' + params.toString() + window.location.hash;
    window.history.replaceState({}, '', newUrl);
    return value;
  }
}

Element.prototype.secureLinks = function (noopener = true, noreferrer = true) {
  return this.$("a").$this(link => {
    !link.$attr("target") && link.$attr("target", "_blank");
    const rel = (link.$attr("rel") || "").split(" ").filter(Boolean);
    noopener && !rel.includes("noopener") && rel.push("noopener");
    noreferrer && !rel.includes("noreferrer") && rel.push("noreferrer");
    rel.length && link.$attr("rel", rel.join(" "));
  });
};

NodeList.prototype.secureLinks = function (noopener = true, noreferrer = true) {
  return this.forEach(el => el.secureLinks(noopener, noreferrer)) || this;
};

function $url(property) {
  if (property === undefined) {
    return window.location.href;
  } else {
    return window.location[property];
  }
}