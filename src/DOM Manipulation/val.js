Element.prototype.val = function (content) {
  if (content === undefined) return this.value;
  this.value = content;
  return this;
};