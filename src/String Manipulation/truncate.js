function $truncate(text, length, trim = true) {
  let truncated = text.slice(0, length);
  return (trim ? truncated.replace(/[^\w]+$/, "") : truncated) + "...";
}

String.prototype.$truncate = function (length, trim = true) {
  return $truncate(this, length, trim);
};