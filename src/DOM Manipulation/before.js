Element.prototype.$before = function (htmlString) {
  if (!htmlString) {
    console.warn("$before: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.parentNode?.insertBefore(fragment, this);
  return this;
};

NodeList.prototype.$before = function (htmlString) {
  if (!htmlString) {
    console.warn("$before: invalid parameter");
    return this;
  }
  Array.from(this).forEach(el => {
    if (el instanceof Element) {
      el.$before(htmlString);
    }
  });
  return this;
};