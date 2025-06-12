Element.prototype.$after = function (htmlString) {
  if (!htmlString) {
    console.warn("$after: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.parentNode?.insertBefore(fragment, this.nextSibling);
  return this;
};

NodeList.prototype.$after = function (htmlString) {
  if (!htmlString) {
    console.warn("$after: invalid parameter");
    return this;
  }
  Array.from(this).forEach(el => {
    if (el instanceof Element) {
      el.$after(htmlString);
    }
  });
  return this;
};