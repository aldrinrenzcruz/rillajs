function toggle(param, displayType = "block") {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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