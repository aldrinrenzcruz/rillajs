function $toKebab(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

String.prototype.$toKebab = function () {
  return $toKebab(this);
};