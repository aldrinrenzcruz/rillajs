Element.prototype.wrap = function (content) {
  const temp = document.createElement("div");
  temp.innerHTML = content;
  const wrapper = temp.firstElementChild;
  if (!wrapper) {
    console.error("$wrap: invalid argument");
    return this;
  }
  const parent = this.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, this);
    wrapper.appendChild(this);
  }
  return this;
};

NodeList.prototype.wrap = HTMLCollection.prototype.wrap = function (content) {
  const elements = Array.from(this);
  elements.forEach(element => {
    if (element instanceof Element) {
      element.wrap(content);
    }
  });
  return this;
};