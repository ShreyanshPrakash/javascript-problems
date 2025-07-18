const circuitBreaker = (fn, pauseDuration, failureCount) => {
  let failedTimes = 0;
  let isPaused = false;

  return function returnFunction(...args) {
    if (failedTimes >= failureCount) {
      if (!isPaused) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          failedTimes = 0;
        }, pauseDuration);
      }
      console.log("Service Unavailable");
      return;
    }

    try {
      const result = fn(...args);
      failedTimes = 0;
      return result;
    } catch (error) {
      failedTimes++;
      console.log(error);
      return error;
    }
  };
};

const sum = (a, b) => {
  throw new Error("Failed me");
};

const pauseDuration = 3 * 1000;
const failureCount = 3;
const circuiteSum = circuitBreaker(sum, pauseDuration, failureCount);

circuiteSum(1, 2);
circuiteSum(1, 2);
circuiteSum(1, 2);
circuiteSum(1, 2);
circuiteSum(1, 2);
circuiteSum(1, 2);

setTimeout(() => {
  circuiteSum(1, 2);
  circuiteSum(1, 2);
}, 3.5 * 1000);
