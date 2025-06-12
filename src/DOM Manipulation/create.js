window.$create = function (tagName) {
  if (!tagName || typeof tagName !== "string") {
    console.warn("$create: invalid tag name");
    return null;
  }
  return document.createElement(tagName);
};