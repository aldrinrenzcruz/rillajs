Element.prototype.$replace = function (htmlString) {
  if (!htmlString) {
    console.warn("$replace: invalid parameter");
    return this;
  }
  this.innerHTML = '';
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

NodeList.prototype.$replace = function (htmlString) {
  if (!htmlString) {
    console.warn("$replace: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$replace(htmlString);
    }
  });
  return this;
};