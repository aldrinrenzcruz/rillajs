Element.prototype.$parent = function(level = 1) {
  let parent = this;
  for (let i = 0; i < level; i++) {
    if (parent.parentNode) {
      parent = parent.parentNode;
    } else {
      return null;
    }
  }
  return parent;
};

NodeList.prototype.$parent = function(level = 1) {
  return Array.from(this).map(el => el.$parent(level));
};