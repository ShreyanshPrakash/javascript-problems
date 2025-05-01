const throttle = (callback, delay) => {
  let lastExecuteTime = new Date().getTime();

  const returnMethod = (...args) => {
    let currentTime = new Date().getTime();

    if (currentTime - lastExecuteTime >= delay) {
      callback.apply(this, args);
      lastExecuteTime = currentTime;
    }
  };

  return returnMethod;
};

const callBackMethod = (message) => console.log(message);

const throttleMethod = throttle(callBackMethod, 500);

throttleMethod("One");
throttleMethod("Two");
throttleMethod("Three");

setTimeout(() => {
  throttleMethod("One");
}, 400);

setTimeout(() => {
  throttleMethod("Two");
}, 500);

setTimeout(() => {
  throttleMethod("Three");
}, 1000);
