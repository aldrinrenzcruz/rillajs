function $(selector) {
  return $select(document, selector);
}

Element.prototype.$ = function (selector) {
  return $select(this, selector);
};

function $select(context, selector) {
  if (typeof selector !== "string" || !selector.trim()) {
    console.error(`$: invalid selector "${selector}"`);
    return null;
  }

  if (!(context instanceof Element) && context !== document) {
    console.error(`$: invalid context`, context);
    return null;
  }

  let elements;

  try {
    elements = context.querySelectorAll(selector);
  } catch (error) {
    console.error(`$: invalid selector "${selector}"`, error);
    return null;
  }

  if (!elements.length) {
    console.error(`$: ${selector} not found.`);
    return null;
  }

  if (selector.startsWith("#") && elements.length > 1) {
    console.warn(`$: (${elements.length}) ${selector} elements found.`);
    return elements[0];
  }

  return elements.length === 1 ? elements[0] : elements;
}

function $id(id, error_log = true) {
  if (typeof id !== "string" || !id.trim()) {
    console.error(`$id: invalid id "${id}"`);
    return null;
  }
  const element = document.getElementById(id);
  if (!element && error_log) {
    console.error(`$id: #"${id}" not found.`);
  }
  return element;
}