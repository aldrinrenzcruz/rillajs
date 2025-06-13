function $url(property) {
  if (property === undefined) {
    return window.location.href;
  } else {
    return window.location[property];
  }
}