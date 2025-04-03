// Accepts a boolean parameter whether it should transform the minor words in the array
function $toTitle(s, cm = true) {
  const m = /^(a|an|the|and|but|or|nor|for|so|yet|at|by|in|is|of|on|to|up|with|as|vs\.?|per|via)$/i;
  if (!s) return '';
  return s.toLowerCase()
    .replace(/\b\w+\b/g, (w, i) => {
      if (i === 0 || !cm || !m.test(w)) {
        return w.charAt(0).toUpperCase() + w.slice(1);
      }
      return w;
    })
    .replace(/([a-z])'s\b/gi, match => {
      return match.toLowerCase();
    })
    .replace(/(?<=\w)-\w/g, match => {
      return match.toUpperCase();
    });
}

String.prototype.$toTitle = function (cm = true) {
  return $toTitle(this, cm);
};