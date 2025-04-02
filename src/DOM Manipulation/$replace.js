Element.prototype.$replace = function (newEl) {
  if (this.parentNode) {
    this.parentNode.replaceChild(newEl, this);
  }
  return newEl;
};

NodeList.prototype.$replace = function (newEl) {
  if (this.length > 0) {
    var firstElement = this[0];
    var replacedElements = [];
    if (firstElement.parentNode) {
      firstElement.parentNode.replaceChild(newEl, firstElement);
      replacedElements.push(newEl);
    }
    for (var i = 1; i < this.length; i++) {
      if (this[i].parentNode) {
        var clone = newEl.cloneNode(true);
        this[i].parentNode.replaceChild(clone, this[i]);
        replacedElements.push(clone);
      }
    }
    return replacedElements.length === 1 ? replacedElements[0] : replacedElements;
  }
  return null;
};