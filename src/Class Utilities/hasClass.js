Element.prototype.hasClass = function (className) {
  if (className === undefined || className === "") {
    return this.classList.length > 0;
  }
  if (typeof className !== "string") {
    console.error("hasClass: Input must be a string");
    return false;
  }
  try {
    return this.classList.contains(className.trim());
  } catch (error) {
    console.error("hasClass: Error checking classes", error);
    return false;
  }
};

NodeList.prototype.hasClass = function (className) {
  if (className === undefined || className === "") {
    return Array.from(this).some(element => element.classList.length > 0);
  }
  if (typeof className !== "string") {
    console.error("hasClass: Input must be a string");
    return false;
  }
  try {
    return Array.from(this).some(element => element.classList.contains(className.trim()));
  } catch (error) {
    console.error("hasClass: Error checking classes", error);
    return false;
  }
};