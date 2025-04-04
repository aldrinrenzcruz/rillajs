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