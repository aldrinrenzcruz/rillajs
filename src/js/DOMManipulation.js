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

window.$create = function (tagName) {
  if (!tagName || typeof tagName !== "string") {
    console.error("$create: invalid tag name");
    return null;
  }
  return document.createElement(tagName);
};

Element.prototype.html = function (content) {
  if (content === undefined) return this.innerHTML;
  this.innerHTML = content;
  return this;
};

Element.prototype.text = function (content) {
  if (content === undefined) return this.textContent;
  this.textContent = content;
  return this;
};

Element.prototype.val = function (content) {
  if (content === undefined) return this.value;
  this.value = content;
  return this;
};