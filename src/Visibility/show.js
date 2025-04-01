function show(param, displayType = "block") {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.display = displayType;
      return element;
    } else {
      console.warn(`show: element with ID ${param} not found`);
      return null;
    }
  }

  // Handle NodeList or HTMLCollection
  if (param instanceof NodeList || param instanceof HTMLCollection) {
    if (param.length === 0) {
      console.warn("show: empty element collection");
      return null;
    }

    // Apply to all elements in the collection
    for (let i = 0; i < param.length; i++) {
      param[i].style.display = displayType;
    }
    return param;
  }

  // Handle single element
  if (param && param.style) {
    param.style.display = displayType;
    return param;
  }

  console.warn("show: element not found or invalid");
  return null;
}

// function show(param, displayType = "block") {
//   const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
//   if (element) {
//     element.style.display = displayType;
//     return element;
//   } else {
//     console.warn("show: element not found");
//     return null;
//   }
// }