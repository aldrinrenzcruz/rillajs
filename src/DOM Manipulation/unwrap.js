Element.prototype.$unwrap = function () {
  const parent = this.parentNode;
  if (!parent || parent === document.documentElement || parent === document.body) {
    return this;
  }
  const grandparent = parent.parentNode;
  if (grandparent) {
    grandparent.insertBefore(this, parent);
    let onlyWhitespaceLeft = true;
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i];
      if (node.nodeType !== 3 || node.nodeValue.trim() !== '') {
        onlyWhitespaceLeft = false;
        break;
      }
    }
    if (parent.childNodes.length === 0 || onlyWhitespaceLeft) {
      grandparent.removeChild(parent);
    }
  }
  return this;
};

NodeList.prototype.$unwrap = function () {
  const elements = Array.from(this);
  const parents = new Set();
  elements.forEach(element => {
    if (element instanceof Element) {
      element.$unwrap();
    }
  });
  return this;
};