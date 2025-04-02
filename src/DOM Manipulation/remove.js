Element.prototype.$remove = function () {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
  return this;
};

NodeList.prototype.$remove = function () {
  Array.prototype.forEach.call(this, function (el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  return this;
};