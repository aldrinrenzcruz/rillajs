function $(selector) {
  return $select(document, selector);
}

Element.prototype.$ = function (selector) {
  return $select(this, selector);
};

// Conflicting with Element.prototype
// window.$ = function (selector) {
//   return $select(document, selector);
// };