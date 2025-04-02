function $show(param, displayType = "block") {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.display = displayType;
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
      param[i].style.display = displayType;
    }
    return param;
  }
  if (param && param.style) {
    param.style.display = displayType;
    return param;
  }
  console.warn("show: element not found or invalid");
  return null;
}

Element.prototype.$show = function (displayType = "block") {
  this.style.display = displayType;
  return this;
};

NodeList.prototype.$show = function (displayType = "block") {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = displayType;
  }
  return this;
};