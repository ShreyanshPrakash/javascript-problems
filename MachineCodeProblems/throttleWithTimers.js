function throttle(callback, delay) {
  let shouldThrottle = false;

  function returnMethod(...args) {
    if (shouldThrottle) {
      return;
    }

    let context = this;
    shouldThrottle = true;
    setTimeout(() => {
      shouldThrottle = false;
    }, delay);

    callback.call(context, ...args);
  }

  return returnMethod;
}
// first time it will always execute then waits for the second time


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