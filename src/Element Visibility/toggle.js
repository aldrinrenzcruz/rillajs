function $toggle(param, displayType = "block", duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      if (window.getComputedStyle(element).display === "none") {
        $show(element, displayType, duration);
      } else {
        $hide(element, duration);
      }
      return element;
    } else {
      console.warn(`toggle: element with ID ${param} not found`);
      return null;
    }
  }
  if (param instanceof NodeList) {
    if (param.length === 0) {
      console.warn("toggle: empty element collection");
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      if (window.getComputedStyle(element).display === "none") {
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
      } else {
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
    }
    return param;
  }
  if (param && param.style) {
    if (window.getComputedStyle(param).display === "none") {
      $show(param, displayType, duration);
    } else {
      $hide(param, duration);
    }
    return param;
  }
  console.warn("toggle: element not found or invalid");
  return null;
}

Element.prototype.$toggle = function (displayType = "block", duration = 0) {
  if (window.getComputedStyle(this).display === "none") {
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
  } else {
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
  }
  return this;
};

NodeList.prototype.$toggle = function (displayType = "block", duration = 0) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (window.getComputedStyle(element).display === "none") {
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
    } else {
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
  }
  return this;
};