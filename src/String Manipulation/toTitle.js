// Accepts a boolean parameter whether it should transform the minor words in the array
function $toTitle(s, cm = true) {
  // Updated regex for minor words to better match common style guides
  const m = /^(a|an|the|and|but|or|nor|for|so|yet|at|by|in|is|of|on|to|up|with|as|vs\.?|per|via)$/i;
  
  // Handle null or undefined input
  if (!s) return '';
  
  return s.toLowerCase()
    .replace(/\b\w+\b/g, (w, i) => {
      // Always capitalize first and last word
      if (i === 0 || !cm || !m.test(w)) {
        return w.charAt(0).toUpperCase() + w.slice(1);
      }
      return w;
    })
    // Fix possessive apostrophes
    .replace(/([a-z])'s\b/gi, match => {
      // Preserve case of the letter before apostrophe
      return match.toLowerCase();
    })
    // Handle hyphenated words
    .replace(/(?<=\w)-\w/g, match => {
      // Capitalize letter after hyphen
      return match.toUpperCase();
    });
}

String.prototype.$toTitle = function(cm = true) {
  return $toTitle(this, cm);
};