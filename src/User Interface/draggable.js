function $initDragging() {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var popups = document.querySelectorAll(".draggable");
  var elmnt = null;
  var currentZIndex = 1;
  for (var i = 0; i < popups.length; i++) {
    var popup = popups[i];
    var header = $getHeader(popup);
    popup.onmousedown = function () {
      this.style.zIndex = "" + ++currentZIndex;
    };
    if (header) {
      header.parentPopup = popup;
      header.onmousedown = $dragMouseDown;
    }
  }
  function $dragMouseDown(e) {
    elmnt = this.parentPopup;
    elmnt.style.zIndex = "" + ++currentZIndex;
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = $closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = $elementDrag;
  }
  function $elementDrag(e) {
    if (!elmnt) {
      return;
    }
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }
  function $closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  function $getHeader(element) {
    var headerItems = element.querySelectorAll(".draggable-handle");

    if (headerItems.length === 1) {
      return headerItems[0];
    }
    return null;
  }
}
$initDragging();

(function () {
  const style = document.createElement("style");
  document.head.appendChild(style);
  const sheet = style.sheet;

  sheet.insertRule(".draggable { position: absolute; overflow: hidden; z-index: 1; }", sheet.cssRules.length);
  sheet.insertRule(".draggable-handle { cursor: grab; z-index: 1; }", sheet.cssRules.length);
})();