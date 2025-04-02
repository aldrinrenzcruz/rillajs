function $id(id, error_log = true) {
  if (typeof id !== "string" || !id.trim()) {
    console.error(`$id: invalid id "${id}"`);
    return null;
  }
  const element = document.getElementById(id);
  if (!element && error_log) {
    console.error(`$id: #"${id}" not found.`);
  }
  return element;
}