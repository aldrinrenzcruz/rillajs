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