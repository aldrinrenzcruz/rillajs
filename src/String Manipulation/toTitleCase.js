function $toTitleCase(inputString, capitalizeMinorWords = false) {
  const minorWords = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|per|so|the|to|up|via|vs\.?|yet)$/i;

  if (!inputString) return '';

  return inputString.toLowerCase()
    .replace(/\b\w+\b/g, (word, index) => {
      // Always capitalize first word, or if capitalizeMinorWords is true, or if not a minor word
      if (index === 0 || capitalizeMinorWords || !minorWords.test(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    // Keep possessive forms lowercase
    .replace(/([a-z])'s\b/gi, possessiveMatch => {
      return possessiveMatch.toLowerCase();
    })
    // Capitalize words after hyphens in compound words
    .replace(/(?<=\w)-\w/g, hyphenatedMatch => {
      return hyphenatedMatch.toUpperCase();
    });
}

String.prototype.$toTitleCase = function (capitalizeMinorWords = false) {
  return $toTitleCase(this, capitalizeMinorWords);
};