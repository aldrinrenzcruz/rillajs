function $toTitle(s) {
  const m = /^(a|an|the|and|but|or|nor|for|so|yet|at|by|in|is|of|on|to|up|with|as|vs?\.?|per|via)$/i;
  return s.toLowerCase()
    .replace(/\b\w+/g, (w, i) => i === 0 || !m.test(w) ? w[0].toUpperCase() + w.slice(1) : w)
    .replace(/'S /g, "'s ");
}

String.prototype.$toTitle = function () {
  return $toTitle(this);
};