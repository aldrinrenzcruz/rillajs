function $showElement(element, displayType, duration) {
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
}

function $show(param, displayType = "block", duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(param);
    if (element) {
      $showElement(element, displayType, duration);
      return element;
    } else {
      return null;
    }
  }

  if (param instanceof NodeList) {
    if (param.length === 0) {
      return null;
    }
    for (let i = 0; i < param.length; i++) {
      $showElement(param[i], displayType, duration);
    }
    return param;
  }

  if (param && param.style) {
    $showElement(param, displayType, duration);
    return param;
  }
  return null;
}

Element.prototype.$show = function (displayType = "block", duration = 0) {
  $showElement(this, displayType, duration);
  return this;
};

NodeList.prototype.$show = function (displayType = "block", duration = 0) {
  for (let i = 0; i < this.length; i++) {
    $showElement(this[i], displayType, duration);
  }
  return this;
};