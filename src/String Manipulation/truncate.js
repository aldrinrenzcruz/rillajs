function $truncate(text, count, trim = true) {
  let truncated = text.slice(0, count);
  return (trim ? truncated.replace(/[^\w]+$/, "") : truncated) + "...";
}

String.prototype.$truncate = function (count, trim = true) {
  return $truncate(this, count, trim);
};