function fadeOut(param, duration = 200) {
  if (typeof param === "string") {
    const element = document.querySelector(`#${param}`);
    if (element) {
      element.style.opacity = 1;
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;

      setTimeout(function () {
        element.style.display = "none";
      }, duration);

      return element;
    } else {
      console.warn(`fadeOut: element with ID ${param} not found`);
      return null;
    }
  }

  // Handle NodeList or HTMLCollection
  if (param instanceof NodeList || param instanceof HTMLCollection) {
    if (param.length === 0) {
      console.warn("fadeOut: empty element collection");
      return null;
    }

    // Apply to all elements in the collection
    for (let i = 0; i < param.length; i++) {
      const element = param[i];
      element.style.opacity = 1;
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;

      // Use closure to capture the current element
      (function (el) {
        setTimeout(function () {
          el.style.display = "none";
        }, duration);
      })(element);
    }
    return param;
  }

  // Handle single element
  if (param && param.style) {
    param.style.opacity = 1;
    param.style.transition = `opacity ${duration}ms`;
    param.style.opacity = 0;

    setTimeout(function () {
      param.style.display = "none";
    }, duration);

    return param;
  }

  console.warn("fadeOut: element not found or invalid");
  return null;
}

Element.prototype.fadeOut = function(duration = 200) {
  this.style.opacity = 1;
  this.style.transition = `opacity ${duration}ms`;
  this.style.opacity = 0;
  
  const element = this;
  setTimeout(function() {
    element.style.display = "none";
  }, duration);
  
  return this;
};

NodeList.prototype.fadeOut = function(duration = 200) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;
    (function(el) {
      setTimeout(function() {
        el.style.display = "none";
      }, duration);
    })(element);
  }
  
  return this;
};

HTMLCollection.prototype.fadeOut = function(duration = 200) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;
    (function(el) {
      setTimeout(function() {
        el.style.display = "none";
      }, duration);
    })(element);
  }
  
  return this;
};


// function fadeOut(param, duration = 200) {
//   const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
//   if (element) {
//     element.style.opacity = 1;
//     element.style.transition = `opacity ${duration}ms`;
//     element.style.opacity = 0;

//     setTimeout(function () {
//       element.style.display = "none";
//     }, duration);

//     return element;
//   } else {
//     console.warn("fadeOut: element not found");
//     return null;
//   }
// }