Element.prototype.$this = function (callback) {
  if (typeof callback === "function") {
    callback(this);
  }
  return this;
};

NodeList.prototype.$this = function (callback) {
  if (typeof callback === "function") {
    this.forEach(el => callback(el));
  }
  return this;
};