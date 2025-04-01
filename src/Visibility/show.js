function show(param, displayType = "block") {
  const element = typeof param === "string" ? document.querySelector(`#${param}`) : param;
  if (element) {
    element.style.display = displayType;
    return element;
  } else {
    console.warn("show: element not found");
    return null;
  }
}