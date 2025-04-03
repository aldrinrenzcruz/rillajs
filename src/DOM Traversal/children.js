Element.prototype.$children = function (level = 1) {
  let current = [this];
  for (let i = 0; i < level; i++) {
    current = current.flatMap(el => Array.from(el.children));
    if (current.length === 0) {
      return null;
    }
  }
  return current;
};

NodeList.prototype.$children = function (level = 1) {
  const results = Array.from(this).flatMap(el => el.$children(level));
  return results.length > 0 ? results : null;
};