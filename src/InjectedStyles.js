(function () {
  const style = document.createElement("style");
  document.head.appendChild(style);
  const sheet = style.sheet;

  sheet.insertRule(".draggable { position: absolute; overflow: hidden; z-index: 1; }", sheet.cssRules.length);
  sheet.insertRule(".draggable-handle { cursor: grab; z-index: 1; }", sheet.cssRules.length);
})();

// (function () {
//   const sheet = new CSSStyleSheet();
//   sheet.insertRule(".draggable { position: absolute; overflow: hidden; z-index: 1; }");
//   sheet.insertRule(".draggable-handle { cursor: grab; z-index: 1; }");

//   document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
// })();
