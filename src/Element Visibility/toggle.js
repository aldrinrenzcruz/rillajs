function $toggleElement(element, displayType, duration) {
  if (window.getComputedStyle(element).display === "none") {
    $showElement(element, displayType, duration);
  } else {
    $hideElement(element, duration);
  }
}

function $toggle(param, displayType = "block", duration = 0) {
  if (typeof param === "string") {
    const element = document.querySelector(param);
    if (element) {
      $toggleElement(element, displayType, duration);
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
      $toggleElement(param[i], displayType, duration);
    }
    return param;
  }

  if (param && param.style) {
    $toggleElement(param, displayType, duration);
    return param;
  }
  return null;
}

Element.prototype.$toggle = function (displayType = "block", duration = 0) {
  $toggleElement(this, displayType, duration);
  return this;
};

NodeList.prototype.$toggle = function (displayType = "block", duration = 0) {
  for (let i = 0; i < this.length; i++) {
    $toggleElement(this[i], displayType, duration);
  }
  return this;
};