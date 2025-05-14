const debounce = (callBackMethod, delay) => {
  let timerId = null;

  const returnMethod = (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callBackMethod(...args);
    }, delay);
  };

  return returnMethod;
};

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