function $toSentence(s) {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

String.prototype.$toSentence = function () {
  return $toSentence(this);
};