function $setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function $getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function $remLocal(key) {
  localStorage.removeItem(key);
}

function $setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function $getSession(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function $remSession(key) {
  sessionStorage.removeItem(key);
}