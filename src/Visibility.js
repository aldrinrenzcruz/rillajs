function $getElement(param) {
  return typeof param === "string" ? document.querySelector(`#${param}`) : param;
}

function show(param, displayType = "block") {
  const element = $getElement(param);
  if (element) {
    element.style.display = displayType;
    return element;
  } else {
    console.warn("show: element not found");
    return null;
  }
}

function hide(param) {
  const element = $getElement(param);
  if (element) {
    element.style.display = "none";
    return element;
  } else {
    console.warn("hide: element not found");
    return null;
  }
}

function toggle(param, displayType = "block") {
  const element = $getElement(param);
  if (element) {
    if (window.getComputedStyle(element).display === "none") {
      show(element, displayType);
    } else {
      hide(element);
    }
    return element;
  } else {
    console.warn("toggle: element not found");
    return null;
  }
}

function fadeIn(param, displayType = "block", duration = 200) {
  const element = $getElement(param);
  if (element) {
    element.style.opacity = 0;
    element.style.display = displayType;
    requestAnimationFrame(function () {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 1;
    });
    return element;
  } else {
    console.warn("fadeIn: element not found");
    return null;
  }
}

function fadeOut(param, duration = 200) {
  const element = $getElement(param);
  if (element) {
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;

    setTimeout(function () {
      element.style.display = "none";
    }, duration);

    return element;
  } else {
    console.warn("fadeOut: element not found");
    return null;
  }
}

function fadeToggle(param, displayType = "block", duration = 200) {
  const element = $getElement(param);
  if (element) {
    if (window.getComputedStyle(element).display === "none") {
      fadeIn(element, displayType, duration);
    } else {
      fadeOut(element, duration);
    }
    return element;
  } else {
    console.warn("fadeToggle: element not found");
    return null;
  }
}