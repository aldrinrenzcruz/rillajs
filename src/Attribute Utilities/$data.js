Element.prototype.$data = function (key, value) {
  // Case 1: No parameters - get all data attributes
  if (arguments.length === 0) {
    const dataAttributes = {};
    Array.from(this.attributes)
      .filter(attr => attr.name.startsWith('data-'))
      .forEach(attr => {
        const keyName = attr.name.slice(5);
        dataAttributes[keyName] = attr.value;
      });
    return dataAttributes;
  }
  // Case 2: Empty string parameter - remove all data attributes
  if (key === "" && arguments.length === 1) {
    const dataAttrs = Array.from(this.attributes)
      .filter(attr => attr.name.startsWith('data-'))
      .map(attr => attr.name);
    dataAttrs.forEach(attrName => {
      this.removeAttribute(attrName);
    });
    return this;
  }
  // Convert key to data-attribute format
  const dataKey = `data-${key}`;
  // Case 3: Get specific data attribute value
  if (arguments.length === 1) {
    return this.getAttribute(dataKey);
  }
  // Case 4: Set specific data attribute value
  if (value === "") {
    this.removeAttribute(dataKey);
  } else {
    this.setAttribute(dataKey, value);
  }
  return this;
};

NodeList.prototype.$data = function (key, value) {
  if (arguments.length === 0) {
    return Array.from(this).map(element => {
      if (element instanceof Element) {
        return element.$data();
      }
      return null;
    });
  }
  Array.from(this).forEach(element => {
    if (element instanceof Element) {
      Element.prototype.$data.apply(element, arguments);
    }
  });
  return this;
};