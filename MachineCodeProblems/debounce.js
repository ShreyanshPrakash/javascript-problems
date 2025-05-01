const debounce = (callback, delay) => {
  let timerId = null;

  const returnMethod = (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    //   callback.apply(this, args);
    }, delay);
  };

  return returnMethod;
};

const callBackMethos = (message) => console.log(message);

const debouncedMethod = debounce(callBackMethos, 500);

debouncedMethod("One");
debouncedMethod("Two");
debouncedMethod("Three");

setTimeout(() => {
  debouncedMethod("One");
}, 600);

setTimeout(() => {
  debouncedMethod("Two");
}, 1200);

setTimeout(() => {
  debouncedMethod("Three");
}, 1800);
