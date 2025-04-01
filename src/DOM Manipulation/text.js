Element.prototype.text = function (content) {
  if (content === undefined) return this.textContent;
  this.textContent = content;
  return this;
};