function $set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function $get(key) {
  return JSON.parse(localStorage.getItem(key));
}

function $rem(key) {
  localStorage.removeItem(key);
}

function $sets(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function $gets(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function $rems(key) {
  sessionStorage.removeItem(key);
}