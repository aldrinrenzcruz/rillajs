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

// option 2. Explicitly assign to window to ensure accessibility in HTML event handlers
// window.$ = $;

function $select(context, el) {
  if (typeof el !== "string" || !el.trim()) {
    console.error(`$: invalid selector "${el}"`);
    return null;
  }

  if (!(context instanceof Element) && context !== document) {
    console.error(`$: invalid context`, context);
    return null;
  }

  let elements;

  try {
    elements = context.querySelectorAll(el);
  } catch (error) {
    console.error(`$: invalid selector "${el}"`, error);
    return null;
  }

  if (!elements.length) {
    console.error(`$: ${el} not found.`);
    return null;
  }

  if (el.startsWith("#") && elements.length > 1) {
    console.warn(`$: (${elements.length}) ${el} elements found.`);
    return elements[0];
  }

  return elements.length === 1 ? elements[0] : elements;
}