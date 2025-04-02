function $hide(param) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.display = "none";
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
      param[i].style.display = "none";
    }
    return param;
  }
  if (param && param.style) {
    param.style.display = "none";
    return param;
  }
  console.warn("hide: element not found or invalid");
  return null;
}

Element.prototype.$hide = function () {
  this.style.display = "none";
  return this;
};

NodeList.prototype.$hide = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = "none";
  }
  return this;
};