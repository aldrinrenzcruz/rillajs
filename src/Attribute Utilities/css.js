Element.prototype.$css = function (property, value) {
  if (typeof property === "string") {
    if (value === undefined) {
      return window.getComputedStyle(this).getPropertyValue(property);
    } else if (typeof value === "function") {
      let currentValue = window.getComputedStyle(this).getPropertyValue(property);
      this.style[property] = value(this, currentValue);
    } else {
      this.style[property] = value;
    }
  } else if (typeof property === "object") {
    for (let key in property) {
      let val = property[key];
      this.style[key] = typeof val === "function" ? val(this, window.getComputedStyle(this).getPropertyValue(key)) : val;
    }
  }
  return this;
};

NodeList.prototype.$css = function (property, value) {
  if (typeof property === "string" && value === undefined) {
    return Array.from(this).map(el => el.$css(property));
  }
  Array.from(this).forEach(el => el.$css(property, value));
  return this;
};