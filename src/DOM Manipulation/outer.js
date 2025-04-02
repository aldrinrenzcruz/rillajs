Element.prototype.outer = function (content) {
  if (content === undefined) {
    return this.outerHTML;
  }
  this.outerHTML = content;
  return this;
};

NodeList.prototype.outer = function (content) {
  if (content === undefined) {
    return Array.from(this).map(el => el.outerHTML);
  }
  for (let i = 0; i < this.length; i++) {
    this[i].outerHTML = content;
  }
  return this;
};