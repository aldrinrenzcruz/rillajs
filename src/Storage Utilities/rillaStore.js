const $rillaStore = (type, key, value) => {
  const store = type === "local" ? localStorage : sessionStorage;
  if (value === undefined) {
    try {
      return JSON.parse(store.getItem(key));
    } catch (e) {
      return store.getItem(key);
    }
  }
  if (value === null) return store.removeItem(key);
  store.setItem(key, JSON.stringify(value));
};