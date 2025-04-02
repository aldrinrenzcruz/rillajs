// This expects either $create or a tag name, doesnt have to be valid
Element.prototype.$replace = function (el) {
  if (typeof el === "string") {
    const div = document.createElement("div");
    div.innerHTML = el.trim();
    el = div.firstChild;
  }
  this.parentNode.replaceChild(el, this);
  return el;
};

NodeList.prototype.$replace = function (el) {
  if (this.length > 0) {
    let first = this[0];
    let replaced = [];
    first.parentNode.replaceChild(el, first);
    replaced.push(el);
    for (let i = 1; i < this.length; i++) {
      if (this[i].parentNode) {
        let clone = el.cloneNode(true);
        this[i].parentNode.replaceChild(clone, this[i]);
        replaced.push(clone);
      }
    }
    return replaced.length === 1 ? replaced[0] : replaced;
  }
  return null;
};