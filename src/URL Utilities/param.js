function $param(key, value) {
  const params = new URLSearchParams(window.location.search);
  if (value === undefined) {
    return params.get(key);
  } else {
    params.set(key, value);
    const newUrl = window.location.pathname + '?' + params.toString() + window.location.hash;
    window.history.replaceState({}, '', newUrl);
    return value;
  }
}