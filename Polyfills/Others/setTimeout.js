function mySetTimeout(handler, delay = 0, ...args) {
  if (typeof handler !== "function") {
    throw Error("Callback passed is not a function");
  }

  let startTime = Date.now();

  function check() {
    let currentTime = Date.now();
    if (currentTime - startTime >= delay) {
      handler(...args);
    }
  }

  requestIdleCallback(check);
}

const handler = (params) => {
  console.log("Cllaed with : ", params);
};
const delay = 2 * 1000;

const timerId = mySetTimeout(handler, delay);
