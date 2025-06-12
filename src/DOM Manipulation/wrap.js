Element.prototype.$wrap = function (content) {
  const temp = document.createElement("div");
  temp.innerHTML = content;
  const wrapper = temp.firstElementChild;
  if (!wrapper) {
    console.warn("$wrap: invalid argument");
    return this;
  }
  const parent = this.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, this);
    wrapper.appendChild(this);
  }
  return this;
};

NodeList.prototype.$wrap = function (content) {
  return Array.from(this).map(el => {
    if (el instanceof Element) {
      return el.$wrap(content);
    }
    return el;
  });
};