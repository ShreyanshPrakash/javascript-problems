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

    this.resolveValue = null;
    this.rejectValue = null;

    this.executor(this.resolve.bind(this), this.reject.bind(this));
    this.handleHandlers.bind(this);
  }

  resolve(res) {
    this.state = PROMISE_STATE_MAP.FULLFILLED;
    this.resolveValue = res;

    this.handleHandlers();
  }

  reject(error) {
    this.state = PROMISE_STATE_MAP.REJECTED;
    this.rejectValue = error;

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

      const promiseValue =
        this.state === PROMISE_STATE_MAP.FULLFILLED
          ? this.resolveValue
          : this.rejectValue;

      try {
        const value = handler(promiseValue);
        this.state = PROMISE_STATE_MAP.FULLFILLED;
        this.resolveValue = value;
      } catch (error) {
        this.state = PROMISE_STATE_MAP.REJECTED;
        this.rejectValue = error;
      } finally {
      }
    }
  }
}

MyPromise.resolve = (res) =>
  new MyPromise((resolve) => resolve(res)).resolveValue;
MyPromise.reject = (error) =>
  new MyPromise((reject) => reject(error)).rejectValue;

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    //   resolve("Success");
    reject("Reject");
  }, 2 * 1000);
});

promise
  .then((res) => {
    console.log("1", res);
    throw new Error("Whoops!");
  })
  .then((res) => console.log("2", res))
  .catch((error) => console.log("3", error))
  .then((res) => console.log(res));

// const result = MyPromise.resolve(10);
// console.log(result);
