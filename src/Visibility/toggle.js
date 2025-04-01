function toggle(param, displayType = "block") {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      if (window.getComputedStyle(element).display === "none") {
        show(element, displayType);
      } else {
        hide(element);
      }
      return element;
    } else {
      console.warn(`toggle: element with ID ${param} not found`);
      return null;
    }
  }

  // Handle NodeList or HTMLCollection
  if (param instanceof NodeList || param instanceof HTMLCollection) {
    if (param.length === 0) {
      console.warn("toggle: empty element collection");
      return null;
    }

    // Toggle each element in the collection
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      if (window.getComputedStyle(element).display === "none") {
        element.style.display = displayType;
      } else {
        element.style.display = "none";
      }
    }
    return param;
  }

  // Handle single element
  if (param && param.style) {
    if (window.getComputedStyle(param).display === "none") {
      show(param, displayType);
    } else {
      hide(param);
    }
    return param;
  }

  console.warn("toggle: element not found or invalid");
  return null;
}

Element.prototype.toggle = function(displayType = "block") {
  if (window.getComputedStyle(this).display === "none") {
    this.style.display = displayType;
  } else {
    this.style.display = "none";
  }
  return this;
};

NodeList.prototype.toggle = function(displayType = "block") {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (window.getComputedStyle(element).display === "none") {
      element.style.display = displayType;
    } else {
      element.style.display = "none";
    }
  }
  return this;
};

HTMLCollection.prototype.toggle = function(displayType = "block") {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (window.getComputedStyle(element).display === "none") {
      element.style.display = displayType;
    } else {
      element.style.display = "none";
    }
  }
  return this;
};

// function toggle(param, displayType = "block") {
//   const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
//   if (element) {
//     if (window.getComputedStyle(element).display === "none") {
//       show(element, displayType);
//     } else {
//       hide(element);
//     }
//     return element;
//   } else {
//     console.warn("toggle: element not found");
//     return null;
//   }
// }