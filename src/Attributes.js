Element.prototype.$attr = function (name, value) {
  if (value === undefined) return this.getAttribute(name);
  this.setAttribute(name, value);
  return this;
};

NodeList.prototype.$attr = function (name, value) {
  if (value === undefined) {
    return Array.from(this).map(el => el.$attr(name));
  }
  this.forEach(el => el.$attr(name, value));
  return this;
};