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