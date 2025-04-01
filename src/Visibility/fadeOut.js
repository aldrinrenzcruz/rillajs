function fadeOut(param, duration = 200) {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
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