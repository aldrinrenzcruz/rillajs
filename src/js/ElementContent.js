Element.prototype.$html = function (content) {
  if (content === undefined) return this.innerHTML;
  this.innerHTML = content;
  return this;
};
Element.prototype.$text = function (content) {
  if (content === undefined) return this.textContent;
  this.textContent = content;
  return this;
};
Element.prototype.$val = function (value) {
  if (value === undefined) return this.value;
  this.value = value;
  return this;
};