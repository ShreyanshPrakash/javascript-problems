const PROMISE_STATE_MAP = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};

class MyPromise {
  constructor(executor) {
    this.executor = executor;
    this.state = PROMISE_STATE_MAP.PENDING;

    this.handlers = [];
    this.promiseValue = null;

    this.executor(this.resolve.bind(this), this.reject.bind(this));
    this.handleHandlers.bind(this);
  }

  resolve(res) {
    this.state = PROMISE_STATE_MAP.FULLFILLED;
    this.promiseValue = res;

    this.handleHandlers();
  }

  reject(error) {
    this.state = PROMISE_STATE_MAP.REJECTED;
    this.promiseValue = error;

    this.handleHandlers();
  }

  then(thenCallback) {
    this.handlers.push({ type: "fullfilled", handler: thenCallback });

    if (this.state === PROMISE_STATE_MAP.FULLFILLED) {
      this.handleHandlers();
    }

    return this;
  }

  catch(catchCallback) {
    this.handlers.push({ type: "rejected", handler: catchCallback });

    if (this.state === PROMISE_STATE_MAP.REJECTED) {
      this.handleHandlers();
    }

    return this;
  }

  /*
    Utility Methods
  */

  handleHandlers() {
    let index = 0;
    while (this.handlers.length) {
      const { type, handler } = this.handlers[index];
      this.handlers.shift();

      if (this.state !== type) {
        continue;
      }

      try {
        const value = handler(this.promiseValue);
        this.state = PROMISE_STATE_MAP.FULLFILLED;
        this.promiseValue = value;
      } catch (error) {
        this.state = PROMISE_STATE_MAP.REJECTED;
        this.promiseValue = error;
      }
    }
  }
}

MyPromise.resolve = (res) =>
  new MyPromise((resolve) => resolve(res)).promiseValue;
MyPromise.reject = (error) =>
  new MyPromise((reject) => reject(error)).promiseValue;

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
      resolve("Success");
    // reject("Reject");
  }, 2 * 1000);
});

promise
  .then((res) => {
    console.log("1", res);
    throw new Error("Whoops!");
  })
  .then((res) => console.log("2", res))
  .catch((error) => console.log("3", error))
  .then((res) => {
    console.log(res)
    return "last"
  });

// const result = MyPromise.resolve(10);
// console.log(result);


setTimeout(() => {
    promise.then((res) => console.log("Late 1", res));
}, 4 * 1000)
