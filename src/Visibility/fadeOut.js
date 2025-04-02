function fadeOut(param, duration = 200) {
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

Element.prototype.fadeOut = function (duration = 200) {
  this.style.opacity = 1;
  this.style.transition = `opacity ${duration}ms`;
  this.style.opacity = 0;

  const element = this;
  setTimeout(function () {
    element.style.display = "none";
  }, duration);

  return this;
};

NodeList.prototype.fadeOut = function (duration = 200) {
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