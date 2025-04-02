Element.prototype.$paint = function (htmlString) {
  this.innerHTML = "";
  if (!htmlString) {
    console.error("$paint: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

NodeList.prototype.$paint = function (htmlString) {
  if (!htmlString) {
    console.error("$paint: invalid parameter");
    return this;
  }
  this.forEach(element => {
    if (element instanceof Element) {
      element.$paint(htmlString);
    }
  });
  return this;
};