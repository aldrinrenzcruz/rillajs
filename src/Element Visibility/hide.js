function $hide(param, duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      if (duration > 0) {
        element.style.opacity = 1;
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = 0;
        setTimeout(function () {
          element.style.display = "none";
        }, duration);
      } else {
        element.style.display = "none";
      }
      return element;
    } else {
      console.warn(`hide: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("hide: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      if (duration > 0) {
        element.style.opacity = 1;
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = 0;
        (function (el) {
          setTimeout(function () {
            el.style.display = "none";
          }, duration);
        })(element);
      } else {
        element.style.display = "none";
      }
    }
    return param;
  }
  if (param && param.style) {
    if (duration > 0) {
      param.style.opacity = 1;
      param.style.transition = `opacity ${duration}ms`;
      param.style.opacity = 0;
      setTimeout(function () {
        param.style.display = "none";
      }, duration);
    } else {
      param.style.display = "none";
    }
    return param;
  }
  console.warn("hide: element not found or invalid");
  return null;
}

Element.prototype.$hide = function (duration = 0) {
  if (duration > 0) {
    this.style.opacity = 1;
    this.style.transition = `opacity ${duration}ms`;
    this.style.opacity = 0;
    const element = this;
    setTimeout(function () {
      element.style.display = "none";
    }, duration);
  } else {
    this.style.display = "none";
  }
  return this;
};

NodeList.prototype.$hide = function (duration = 0) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (duration > 0) {
      element.style.opacity = 1;
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;
      (function (el) {
        setTimeout(function () {
          el.style.display = "none";
        }, duration);
      })(element);
    } else {
      element.style.display = "none";
    }
  }
  return this;
};