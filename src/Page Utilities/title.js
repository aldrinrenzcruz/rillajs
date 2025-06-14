function $title(newTitle) {
  if (newTitle === undefined) {
    return document.title;
  } else {
    document.title = newTitle;
    return newTitle;
  }
}