function createResumableInterval(callback, delay, ...args) {
  let intervalId = null;
  let isStopped = false;

  function start() {
    if (isStopped || intervalId !== null) {
      return;
    }

    callback.call(this, ...args);

    intervalId = setInterval(() => {
      callback.call(this, ...args);
    }, delay);
  }

  function pause() {
    if (isStopped) {
      return;
    }
    clear();
  }

  function stop() {
    isStopped = true;
    clear();
  }

  /*
    Utility Methods
  */

  function clear() {
    clearInterval(intervalId);
    intervalId = null;
  }

  return { start, pause, stop };
}

/*
    Runner Code
*/

let i = 0;
// t = 0:
const interval = createResumableInterval(() => {
  i++;
}, 10);
// t = 10:

interval.start(); // i is now 1.
// t = 20: callback executes and i is now 2.
// t = 25:
interval.pause();
// t = 30: i remains at 2 because interval.pause() was called.
// t = 35:
interval.start(); // i is now 3.
// t = 45: callback executes and i is now 4.
// t = 50:
interval.stop(); // i remains at 4.
