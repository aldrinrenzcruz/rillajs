function hide(param) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.display = "none";
      return element;
    } else {
      console.warn(`hide: element with ID ${param} not found`);
      return null;
    }
  }

  // Handle NodeList or HTMLCollection
  if (param instanceof NodeList || param instanceof HTMLCollection) {
    if (param.length === 0) {
      console.warn("hide: empty element collection");
      return null;
    }

    // Apply to all elements in the collection
    for (let i = 0; i < param.length; i++) {
      param[i].style.display = "none";
    }
    return param;
  }

  // Handle single element
  if (param && param.style) {
    param.style.display = "none";
    return param;
  }

  console.warn("hide: element not found or invalid");
  return null;
}

// function hide(param) {
//   const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
//   if (element) {
//     element.style.display = "none";
//     return element;
//   } else {
//     console.warn("hide: element not found");
//     return null;
//   }
// }