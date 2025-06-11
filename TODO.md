**TODO:**
- Add personal note to explain project scope
- Dynamically build both left and right sidebars

**FOR CONSIDERATION:**
- Add once, capture, passive, signal methods for the event listeners
- Add customizabilty section mentioning how can it be made more lightweight or customize to what you need only
- Add a script to force jump to hashed url on window load after building the page
- Add a roadmap
- Add error handling for examples fetch script for invalid query selectors, just skip those
- Test performance benchmark
- Reduce total file size by shortening variable and helper functions names, also by using arrow function when possible
- Create a converter for vanilla to Rilla and vice versa
- Add installation via npm
- Add in Visibility: slideUp, slideDown, slideToggle
- Add in User Interface: resizable()
- Remove unnecessary checks on each function to reduce bloat and improve speed

**COMPLETED:**
- Modify .unwrap to make sure the parent isn't the body
- Modify toTitle to accept a parameter that will determine if it will convert the common words
- Add $css method to add style
- Move $this to DOM Traversal
- Add .parent() to docs
- Remove dollar for attr, data, class
- Add methods for console.log, console.info console.error, and console.warn $log, $info, $err, $warn

**NOT IMPLEMENTED:**
- Add DOM Traversal: parents, parentsUntil, find, next, nextAll, nextUntil, prev, prevAll, prevUntil, first, last
- Modify and .parent() to .appendToParent
- Add "selector" to error message for invalid selector instead of just "$:"

**NOTES:**
