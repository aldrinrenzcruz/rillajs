Element.prototype.$replace = function (el) {
  if (this.parentNode) {
    this.parentNode.replaceChild(el, this);
  }
  return el;
};

NodeList.prototype.$replace = function (el) {
  if (this.length > 0) {
    var firstElement = this[0];
    var replacedElements = [];
    if (firstElement.parentNode) {
      firstElement.parentNode.replaceChild(el, firstElement);
      replacedElements.push(el);
    }
    for (var i = 1; i < this.length; i++) {
      if (this[i].parentNode) {
        var clone = el.cloneNode(true);
        this[i].parentNode.replaceChild(clone, this[i]);
        replacedElements.push(clone);
      }
    }
    return replacedElements.length === 1 ? replacedElements[0] : replacedElements;
  }
  return null;
};