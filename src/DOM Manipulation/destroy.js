Element.prototype.destroy = function () {
  this.parentNode?.removeChild(this);
  return this;
};

NodeList.prototype.destroy = function () {
  this.forEach(el => el.destroy());
  return this;
};