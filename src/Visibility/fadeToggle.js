function fadeToggle(param, displayType = "block", duration = 200) {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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