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

HTMLCollection.prototype.$class = function (classNames) {
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