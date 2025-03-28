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