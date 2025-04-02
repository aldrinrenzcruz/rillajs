**TODO:**
- Add personal note to explain project scope
- Dynamically build both left and right sidebars

**FOR CONSIDERATION:**
- Add once, capture, passive, signal methods for the event listeners
- Add customizabilty section mentioning how can it be made more lightweight or customize to what you need only
- Add a script to force jump to hashed url on window load after building the page
- Modify and .parent() to .appendToParent
- Add .parent() to docs
- Add a roadmap
- Add error handling for examples fetch script for invalid query selectors, just skip those
- Test performance benchmark
- Reduce total file size by shortening variable and helper functions names, also by using arrow function when possible
- Create a converter for vanilla to Rilla and vice versa
- Add installation via npm
- Add DOM Traversal: parent, parents, parentsUntil, children, find, siblings, next, nextAll, nextUntil, prev, prevAll, prevUntil, first, last
- Add $css method to add style
- Move $this to DOM Traversal

- Add in Visibility: slideUp, slideDown, slideToggle
- Add in User Interface: resizable()

**COMPLETED:**
- Add methods for console.log, console.info console.error, and console.warn $log, $info, $err, $warn
- Add $replace method
- Add $remove method
- Add $data to access all element data, should accept parameter, get or set value
- Extend $paint, $append, $prepend to NodeList
- Remove extensions for HTMLCollection to reduce total file size
- Move Class Utilities to Attribute Utilities
- Add right sidebar for Page Contents and header
- Create a disclaimer banner at the top
- Add installation via CDN
- Rename draggable-handle to drag-handle
- Remove injected CSS
- Extend $class and hasClass to HTML Collection
- Extend addClass, removeClass, and toggleClass to NodeList and HTML Collection
- Rename ClassUtils to ClassUtilities
- Add .outer() method
- Extend html, text, val to NodeList, HTMLCollection
- Update visibility fns to extend element, NodeList, HTMLCollection
- Test if show/hide/toggle works for multiple elements at a time, e.g. $("p")
- Remove the old $eventname event handlers
- Modify merge.js to support splitting src scripts
- Move examples (docs) array to a separate file
- Change .js and .css file names to be the same per use case (i.e. app.js, app.min.js)
- Create <pre><code class="language-html"></code></pre> dynamically, add metadata to the examples .txt files
- Add .on and .off event handlers to the docs
- Add .hasClass() to return a boolean
- Specify adding the rilla.min.js in the head
- Add $class
- Change how .parent() works by instead or returning the parent, move to it directly and edit the parent element

**NOT IMPLEMENTED:**
- Add "selector" to error message for invalid selector instead of just "$:"

**NOTES:**
