const $log = console.log;
$log("Hello, world!"); // Same as console.log()

const $setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const $getStorage = (key) => JSON.parse(localStorage.getItem(key));
const $removeStorage = (key) => localStorage.removeItem(key);
✅ Example Usage:

$setStorage("theme", "dark");
console.log($getStorage("theme")); // "dark"
Session Storage

const $setSession = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
const $getSession = (key) => JSON.parse(sessionStorage.getItem(key));
const $removeSession = (key) => sessionStorage.removeItem(key);
