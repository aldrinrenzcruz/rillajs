Element.prototype.html = function (content) {
  if (content === undefined) return this.innerHTML;
  this.innerHTML = content;
  return this;
};