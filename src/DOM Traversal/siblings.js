Element.prototype.$siblings = function () {
  return Array.from(this.parentNode.children).filter(el => el !== this);
};

NodeList.prototype.$siblings = function () {
  return Array.from(this).map(el =>
    Array.from(el.parentNode.children).filter(child => child !== el)
  );
};