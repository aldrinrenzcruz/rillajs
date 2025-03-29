// Helper function to get elements
function $getElement(param) {
  return typeof param === "string" ? document.querySelector(`#${param}`) : param;
}

// Add methods to HTMLElement prototype
HTMLElement.prototype.show = function(display_style = "block") {
  show(this, display_style);
  return this;
};

HTMLElement.prototype.hide = function() {
  hide(this);
  return this;
};

HTMLElement.prototype.toggle = function(display_style = "block") {
  toggle(this, display_style);
  return this;
};

// Standalone functions
function show(param, display_style = "block") {
  const element = $getElement(param);
  const display = display_style;
  if (element) {
    element.style.opacity = 0;
    element.style.display = display;
    requestAnimationFrame(function () {
      element.style.transition = "opacity 200ms";
      element.style.opacity = 1;
    });
    return element;
  } else {
    console.warn("Element being shown not found or invalid parameter.");
    return null;
  }
}

function hide(param) {
  const element = $getElement(param);
  if (element) {
    element.style.opacity = 0;
    requestAnimationFrame(function () {
      element.style.transition = "opacity 200ms";
      element.style.display = "none";
    });
    return element;
  } else {
    console.warn("Element being hidden not found or invalid parameter.");
    return null;
  }
}

function toggle(param, display_style = "block") {
  const element = $getElement(param);
  const display = display_style;
  if (element) {
    if (window.getComputedStyle(element).display === "none") {
      show(element, display);
    } else {
      hide(element);
    }
    return element;
  } else {
    console.warn("Element being toggled not found or invalid parameter.");
    return null;
  }
}

// Create global utility object
window = {
  show: show,
  hide: hide,
  toggle: toggle,
  getElement: $getElement,
  // Shorthand functions for elements by ID
  get: function(id) {
    const element = document.getElementById(id);
    return element;
  }
};