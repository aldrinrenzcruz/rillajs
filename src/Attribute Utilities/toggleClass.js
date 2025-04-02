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

NodeList.prototype.toggleClass = function (classNames) {
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