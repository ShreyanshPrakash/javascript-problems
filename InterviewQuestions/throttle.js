const throttle = (callBackMethod, delay) => {
  let lastExecutedTime = new Date().getTime();

  const returnMethod = (...args) => {
    const currentTime = new Date().getTime();
    const diff = currentTime - lastExecutedTime;

    if (diff >= delay) {
      callBackMethod.apply(this, args);
      lastExecutedTime = currentTime;
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
}, 1200);

setTimeout(() => {
  throttleMethod("Two");
}, 500);

setTimeout(() => {
  throttleMethod("Three");
}, 1100);