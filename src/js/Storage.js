const storage = (type, key, value) => {
  const store = type === "local" ? localStorage : sessionStorage;
  if (value === undefined) return JSON.parse(store.getItem(key));
  if (value === null) return store.removeItem(key);
  store.setItem(key, JSON.stringify(value));
};
const $local = (key, value) => storage("local", key, value);
const $session = (key, value) => storage("session", key, value);