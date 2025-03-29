// Main function to select elements from the document
function $(selector) {
  return $select(document, selector);
}

// Method to select elements within a specific element
Element.prototype.$ = function (selector) {
  return $select(this, selector);
};

// Core selection function
function $select(context, selector) {
  // Ensure the selector is a valid, non-empty string
  if (typeof selector !== "string" || !selector.trim()) {
    console.error(`$: Invalid selector "${selector}"`);
    return null;
  }

  // Ensure the context is either the document or a valid element
  if (!(context instanceof Element) && context !== document) {
    console.error(`$: Invalid context`, context);
    return null;
  }

  let elements;

  try {
    // Attempt to select elements using querySelectorAll
    elements = context.querySelectorAll(selector);
  } catch (error) {
    // Catch and log invalid CSS selectors
    console.error(`$: Invalid CSS selector "${selector}"`, error);
    return null;
  }

  // Handle case where no elements match the selector
  if (!elements.length) {
    console.error(`$: ${selector} not found.`);
    return null;
  }

  // If an ID selector (`#id`) is used and multiple elements are found, return only the first one
  if (selector.startsWith("#") && elements.length > 1) {
    console.warn(`$: (${elements.length}) ${selector} elements found.`);
    return elements[0];
  }

  // Return a single element if only one was found, otherwise return the NodeList
  return elements.length === 1 ? elements[0] : elements;
}