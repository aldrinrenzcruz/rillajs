Element.prototype.$attr = function (name, value) {
  if (value === undefined) return this.getAttribute(name);
  this.setAttribute(name, value);
  return this;
};