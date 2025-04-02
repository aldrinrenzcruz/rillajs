Element.prototype.$paint = function (htmlString) {
  this.innerHTML = "";
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

NodeList.prototype.$paint = function (htmlString) {
  this.forEach(element => {
    if (element instanceof Element) {
      element.$paint(htmlString);
    }
  });
  return this;
};