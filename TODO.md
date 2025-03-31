**TODO:**
- Rename ClassUtils to ClassManagement
- Modify merge.js to support splitting src scripts by adding easy file pathing
- Add .on and .off event handlers to the docs

**FOR CONSIDERATION:**
- Performance benchmark tests
- Reduce total file size by shortening variable and helper functions names, also by using arrow function when possible
- Create a converter vanilla to Rilla and vice versa
- Add installation via CDN
- Add installation via npm
- Add DOM Traversal: parent, parents, parentsUntil, children, find, siblings, next, nextAll, nextUntil, prev, prevAll, prevUntil, first, last
- Add $css method to add style
- Add $data to access all element data, should accept parameter, get or set value

**COMPLETED:**
- Add .hasClass() to return a boolean
- Specify adding the rilla.min.js in the head
- $class, full replacement of element class

**NOT IMPLEMENTED:**
- Add "selector" to error for invalid selector instead of just "$:"

**NOTES:**
appendTo(parent) {
(typeof parent === "string" ? document.querySelector(parent) : parent).appendChild(this.element);
return this;
}

$create("button").text("Click me").appendTo("body");

---

element.off() - Removes all event listeners
element.off("click") - Removes all click event listeners
element.off("click", handler) - Removes a specific click event handler

// Add a click event listener to a button
const btn = document.getElementById("myButton");
btn.on("click", function() {
  console.log("Button clicked!");
});

// Add event to multiple elements at once
document.querySelectorAll(".items").on("mouseover", function() {
  this.classList.add("hover");
});

// Remove all event listeners from an element
btn.off();

// Remove all click events
btn.off("click");

// Remove a specific event handler
const handler = function() { alert("Hello!"); };
btn.on("click", handler);
// Later...
btn.off("click", handler);

// Method chaining
btn.on("click", fn1).on("mouseover", fn2).off("mouseout");

// Prevent default action for a click
btn.on("click", () => {
  console.log("Clicked but form won't submit");
}).prevent();

// Stop event propagation
btn.on("click", () => {
  console.log("Clicked but parent elements won't receive the event");
}).stop();

// Chain both methods
btn.on("click", () => {
  console.log("Clicked with both prevent and stop");
}).prevent().stop();

// Works with multiple elements
document.querySelectorAll(".link").on("click", function() {
  this.classList.add("visited");
}).prevent();

WeakMap(
  element1 → Map(
    "click" → [handler1, handler2],
    "mouseover" → [handler3]
  ),
  element2 → Map(
    "input" → [handler4]
  )
)
