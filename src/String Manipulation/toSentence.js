function $toSentenceCase(s) {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

String.prototype.$toSentenceCase = function () {
  return $toSentenceCase(this);
};