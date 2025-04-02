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