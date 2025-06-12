Element.prototype.$prepend = function (htmlString) {
  if (!htmlString) {
    console.warn("$prepend: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.prepend(fragment);
  return this;
};

NodeList.prototype.$prepend = function (htmlString) {
  if (!htmlString) {
    console.warn("$prepend: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$prepend(htmlString);
    }
  });
  return this;
};