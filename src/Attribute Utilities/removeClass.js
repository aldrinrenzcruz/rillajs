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