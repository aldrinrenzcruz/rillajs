Element.prototype.val = function (content) {
  if (content === undefined) {
    return this.value;
  }
  this.value = content;
  return this;
};

NodeList.prototype.val = function (content) {
  if (content === undefined) {
    return Array.from(this).map(el => "value" in el ? el.value : null);
  }
  for (let i = 0; i < this.length; i++) {
    if ("value" in this[i]) {
      this[i].value = content;
    }
  }
  return this;
};