function throttle(callback, delay) {
  let shouldThrottle = false;

  function returnMethod(...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(() => {
      shouldThrottle = false;
    }, delay);

    callback.call(this, ...args);
  }

  return returnMethod;
}


const callBackMethod = (message) => console.log(message);

const throttleMethod = throttle(callBackMethod, 500);

throttleMethod("One");
throttleMethod("Two");
throttleMethod("Three");

setTimeout(() => {
  throttleMethod("four");
}, 1200);

setTimeout(() => {
  throttleMethod("five");
}, 500);

setTimeout(() => {
  throttleMethod("six");
}, 1100);