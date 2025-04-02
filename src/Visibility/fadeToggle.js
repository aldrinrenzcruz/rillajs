function fadeToggle(param, displayType = "block", duration = 200) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      if (window.getComputedStyle(element).display === "none") {
        fadeIn(element, displayType, duration);
      } else {
        fadeOut(element, duration);
      }
      return element;
    } else {
      console.warn(`fadeToggle: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("fadeToggle: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      if (window.getComputedStyle(element).display === "none") {
        element.style.opacity = 0;
        element.style.display = displayType;
        (function (el) {
          requestAnimationFrame(function () {
            el.style.transition = `opacity ${duration}ms`;
            el.style.opacity = 1;
          });
        })(element);
      } else {
        element.style.opacity = 1;
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = 0;
        (function (el) {
          setTimeout(function () {
            el.style.display = "none";
          }, duration);
        })(element);
      }
    }
    return param;
  }
  if (param && param.style) {
    if (window.getComputedStyle(param).display === "none") {
      fadeIn(param, displayType, duration);
    } else {
      fadeOut(param, duration);
    }
    return param;
  }
  console.warn("fadeToggle: element not found or invalid");
  return null;
}

Element.prototype.fadeToggle = function (displayType = "block", duration = 200) {
  if (window.getComputedStyle(this).display === "none") {
    this.fadeIn(displayType, duration);
  } else {
    this.fadeOut(duration);
  }
  return this;
};

NodeList.prototype.fadeToggle = function (displayType = "block", duration = 200) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (window.getComputedStyle(element).display === "none") {
      element.style.opacity = 0;
      element.style.display = displayType;
      (function (el) {
        requestAnimationFrame(function () {
          el.style.transition = `opacity ${duration}ms`;
          el.style.opacity = 1;
        });
      })(element);
    } else {
      element.style.opacity = 1;
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;
      (function (el) {
        setTimeout(function () {
          el.style.display = "none";
        }, duration);
      })(element);
    }
  }
  return this;
};