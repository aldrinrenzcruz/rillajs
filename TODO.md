TODO:
- $class, full replacement of element class

FOR CONSIDERATION:
- Add installation via CDN
- Add installation via npm
- Add DOM Traversal: parent, parents, parentsUntil, children, find, siblings, next, nextAll, nextUntil, prev, prevAll, prevUntil, first, last
- Add $css method to add style
- Add $data to access all element data, should accept parameter, get or set value

COMPLETED:

NOT IMPLEMENTED:
- Add "selector" to error for invalid selector instead of just "$:"

NOTES:
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
