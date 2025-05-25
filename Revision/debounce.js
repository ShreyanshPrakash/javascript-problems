function debounce(callback, delay) {
  let timerId = null;

  return function returnMethod(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.call(this, ...args);
    }, delay);
  };
}

const callBackMethod = (message) => console.log(message);

const debouncedMethod = debounce(callBackMethod, 500);

debouncedMethod("One");
debouncedMethod("Two");
debouncedMethod("Three");

setTimeout(() => {
  debouncedMethod("One");
}, 400);

setTimeout(() => {
  debouncedMethod("Two");
}, 500);

setTimeout(() => {
  debouncedMethod("Three");
}, 1000);
