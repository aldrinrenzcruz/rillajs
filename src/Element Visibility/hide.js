function $hideElement(element, duration) {
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
}

function $hide(param, duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(param);
    if (element) {
      $hideElement(element, duration);
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
      $hideElement(param[i], duration);
    }
    return param;
  }

  if (param && param.style) {
    $hideElement(param, duration);
    return param;
  }
  return null;
}

Element.prototype.$hide = function (duration = 0) {
  $hideElement(this, duration);
  return this;
};

NodeList.prototype.$hide = function (duration = 0) {
  for (let i = 0; i < this.length; i++) {
    $hideElement(this[i], duration);
  }
  return this;
};