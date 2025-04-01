function hide(param) {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
  if (element) {
    element.style.display = "none";
    return element;
  } else {
    console.warn("hide: element not found");
    return null;
  }
}