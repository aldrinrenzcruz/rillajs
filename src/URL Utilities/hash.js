function $hash(value) {
  if (value === undefined) {
    return window.location.hash.slice(1);
  } else {
    window.location.hash = value;
    return value;
  }
}