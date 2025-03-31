**TODO:**
- Rename ClassUtils to ClassUtilities
- Modify merge.js to support splitting src scripts by adding easy file pathing
- Create <pre><code class="language-html"></code></pre> dynamically, add metadata to the examples .txt files
- Add error handling for examples fetch script for invalid query selectors, just skip those
- Change .js and .css file names to be the same per use case (i.e. app.js, app.min.js)

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
- Add .on and .off event handlers to the docs
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