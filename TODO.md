**TODO:**
- Add .parent() to docs
- Modify Injected Styles not create style tags if it already exists.
- Test if show/hide/toggle works for multiple elements at a time, e.g. $("p")

**FOR CONSIDERATION:**
- Add error handling for examples fetch script for invalid query selectors, just skip those
- Rename ClassUtils to ClassUtilities
- Performance benchmark tests
- Reduce total file size by shortening variable and helper functions names, also by using arrow function when possible
- Create a converter vanilla to Rilla and vice versa
- Add installation via CDN
- Add installation via npm
- Add DOM Traversal: parent, parents, parentsUntil, children, find, siblings, next, nextAll, nextUntil, prev, prevAll, prevUntil, first, last
- Add $css method to add style
- Add $data to access all element data, should accept parameter, get or set value

**COMPLETED:**
- Remove the old $eventname event handlers
- Modify merge.js to support splitting src scripts
- Move examples (docs) array to a separate file
- Change .js and .css file names to be the same per use case (i.e. app.js, app.min.js)
- Create <pre><code class="language-html"></code></pre> dynamically, add metadata to the examples .txt files
- Add .on and .off event handlers to the docs
- Add .hasClass() to return a boolean
- Specify adding the rilla.min.js in the head
- $class, full replacement of element class
- Change how .parent() works by instead or returning the parent, move to it directly and edit the parent element

**NOT IMPLEMENTED:**
- Add "selector" to error for invalid selector instead of just "$:"

**NOTES:**
appendTo(parent) {
(typeof parent === "string" ? document.querySelector(parent) : parent).appendChild(this.element);
return this;
}

$create("button").text("Click me").appendTo("body");

---

window.$ = function (selector) {
  return $select(document, selector);
};


---

NodeList.prototype.html = function (content) {
  if (content === undefined) {
    // Return array of innerHTML values if getting
    return Array.from(this).map(el => el.innerHTML);
  }
  // Set innerHTML for all elements
  this.forEach(el => {
    el.innerHTML = content;
  });
  return this;
};

NodeList.prototype.text = function (content) {
  if (content === undefined) {
    // Return array of textContent values if getting
    return Array.from(this).map(el => el.textContent);
  }
  // Set textContent for all elements
  this.forEach(el => {
    el.textContent = content;
  });
  return this;
};

NodeList.prototype.val = function (content) {
  if (content === undefined) {
    // Return array of values if getting
    return Array.from(this).map(el => el.value);
  }
  // Set value for all elements
  this.forEach(el => {
    if ("value" in el) {
      el.value = content;
    }
  });
  return this;
};

--

NodeList.prototype.addClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("addClass: input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("addClass: no valid classes provided");
    return this;
  }

  try {
    this.forEach(element => {
      element.classList.add(...classes);
    });
  } catch (error) {
    console.error("addClass: error adding classes", error);
  }

  return this;
};

NodeList.prototype.removeClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("removeClass: input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("removeClass: no valid classes provided");
    return this;
  }

  try {
    this.forEach(element => {
      element.classList.remove(...classes);
    });
  } catch (error) {
    console.error("removeClass: error removing classes", error);
  }

  return this;
};

NodeList.prototype.toggleClass = function (classNames) {
  if (typeof classNames !== "string") {
    console.error("toggleClass: input must be a string");
    return this;
  }

  const classes = classNames.trim().split(/\s+/).filter(cls => cls);

  if (classes.length === 0) {
    console.warn("toggleClass: no valid classes provided");
    return this;
  }

  try {
    this.forEach(element => {
      classes.forEach(cls => element.classList.toggle(cls));
    });
  } catch (error) {
    console.error("toggleClass: error toggling classes", error);
  }

  return this;
};