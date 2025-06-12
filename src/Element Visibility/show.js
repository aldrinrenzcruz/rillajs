function $show(param, displayType = "block", duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
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
      return element;
    } else {
      console.warn(`show: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("show: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      if (duration > 0) {
        element.style.opacity = 0;
        element.style.display = displayType;
        (function (el) {
          requestAnimationFrame(function () {
            el.style.transition = `opacity ${duration}ms`;
            el.style.opacity = 1;
          });
        })(element);
      } else {
        element.style.display = displayType;
      }
    }
    return param;
  }
  if (param && param.style) {
    if (duration > 0) {
      param.style.opacity = 0;
      param.style.display = displayType;
      requestAnimationFrame(function () {
        param.style.transition = `opacity ${duration}ms`;
        param.style.opacity = 1;
      });
    } else {
      param.style.display = displayType;
    }
    return param;
  }
  console.warn("show: element not found or invalid");
  return null;
}

Element.prototype.$show = function (displayType = "block", duration = 0) {
  if (duration > 0) {
    this.style.opacity = 0;
    this.style.display = displayType;
    const element = this;
    requestAnimationFrame(function () {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 1;
    });
  } else {
    this.style.display = displayType;
  }
  return this;
};

NodeList.prototype.$show = function (displayType = "block", duration = 0) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (duration > 0) {
      element.style.opacity = 0;
      element.style.display = displayType;
      (function (el) {
        requestAnimationFrame(function () {
          el.style.transition = `opacity ${duration}ms`;
          el.style.opacity = 1;
        });
      })(element);
    } else {
      element.style.display = displayType;
    }
  }
  return this;
};