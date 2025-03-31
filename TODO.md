TODO:
- Add installation via CDN
- Add installation via npm
- $class, full replacement of element class
- $css
- Add "selector" to error for invalid selector instead of just "$:"
- Consider adding DOM Traversal: parent, parents, parentsUntil, children, find, siblings, next, nextAll, nextUntil, prev, prevAll, prevUntil, first, last


appendTo(parent) {
  (typeof parent === "string" ? document.querySelector(parent) : parent).appendChild(this.element);
  return this;
}

$create("button").text("Click me").appendTo("body");

on(event, handler) {
  this.element.addEventListener(event, handler);
  return this;
}

$create("button").on("click", () => alert("Clicked!"));
