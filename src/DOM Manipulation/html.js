Element.prototype.$html = function (content) {
  if (content === undefined) {
    return this.innerHTML;
  }
  this.innerHTML = content;
  return this;
};

NodeList.prototype.$html = function (content) {
  if (content === undefined) {
    return Array.from(this).map(el => el.innerHTML);
  }
  for (let i = 0; i < this.length; i++) {
    this[i].innerHTML = content;
  }
  return this;
};