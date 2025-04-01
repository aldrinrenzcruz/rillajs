function fadeIn(param, displayType = "block", duration = 200) {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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