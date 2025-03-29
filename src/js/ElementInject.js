Element.prototype.$prepend = function (htmlString) {
  if (!htmlString) {
    console.error("$prepend: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.prepend(fragment);
  return this;
};

Element.prototype.$append = function (htmlString) {
  if (!htmlString) {
    console.error("$append: invalid parameter");
    return this;
  }
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const fragment = template.content;
  this.append(fragment);
  return this;
};

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