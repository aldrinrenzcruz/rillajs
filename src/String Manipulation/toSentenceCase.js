function $toSentenceCase(s) {
  if (!s) return "";
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

String.prototype.$toSentenceCase = function () {
  return $toSentenceCase(this);
};