Element.prototype.$append = function (htmlString) {
  if (!htmlString) {
    console.warn("$append: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

NodeList.prototype.$append = function (htmlString) {
  if (!htmlString) {
    console.warn("$append: invalid parameter");
    return this;
  }
  this.forEach(el => {
    if (el instanceof Element) {
      el.$append(htmlString);
    }
  });
  return this;
};