function $toKebabCase(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

String.prototype.$toKebabCase = function () {
  return $toKebabCase(this);
};