Element.prototype.text = function(content) {
  if (content === undefined) {
    return this.textContent;
  }
  this.textContent = content;
  return this;
};

NodeList.prototype.text = function(content) {
  if (content === undefined) {
    return Array.from(this).map(el => el.textContent);
  }
  for (let i = 0; i < this.length; i++) {
    this[i].textContent = content;
  }
  return this;
};