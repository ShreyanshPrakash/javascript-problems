const MY_PROMISE_STATE = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};

class MyCustomPromise {
  #resolutionHandlerList;
  #rejectionHandlerList;

  constructor(executor) {
    this.executor = executor;
    this.status = MY_PROMISE_STATE.PENDING;
    this.params = this.params;

    this.#resolutionHandlerList = [];
    this.#rejectionHandlerList = [];

    this.executor(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(params) {
    queueMicrotask(() => {
      if (this.#isPending()) {
        this.params = params;
        this.status = MY_PROMISE_STATE.FULLFILLED;
        this.#runResolutionHandlers();
      }
    });
  }

  #reject(params) {
    queueMicrotask(() => {
      if (this.#isPending()) {
        this.params = params;
        this.status = MY_PROMISE_STATE.REJECTED;
        this.#runRejectionHandlers();
      }
    });
  }

  then(resolutionHandler, rejectionHandler) {
    return new MyCustomPromise((resolve, reject) => {
      const handler = this.#createHandler.bind(this, resolve, reject);

      const thenHandler = handler.bind(this, resolutionHandler);
      const catchHandler = handler.bind(this, rejectionHandler);

      this.#resolutionHandlerList.push(thenHandler);
      this.#rejectionHandlerList.push(catchHandler);

      if (this.#isFullFilled()) {
        this.#runResolutionHandlers();
      } else if (this.#isRejected()) {
        this.#runRejectionHandlers();
      }
    });
  }

  catch(rejectionHandler) {
    this.then(null, rejectionHandler);
  }

  /*
    Utility Methods
  */

  #runResolutionHandlers() {
    if (this.#resolutionHandlerList.length) {
      this.#resolutionHandlerList.forEach((handler) => handler(this.params));
      this.#resolutionHandlerList = [];
    }
  }

  #runRejectionHandlers() {
    if (this.#rejectionHandlerList.length) {
      this.#rejectionHandlerList.forEach((handler) => handler(this.params));
      this.#rejectionHandlerList = [];
    }
  }

  #isPending() {
    return this.status === MY_PROMISE_STATE.PENDING;
  }

  #isFullFilled() {
    return this.status === MY_PROMISE_STATE.FULLFILLED;
  }

  #isRejected() {
    return this.status === MY_PROMISE_STATE.REJECTED;
  }

  #createHandler(resolve, reject, handler, params) {
    if (!handler) {
      return resolve(params);
    }

    try {
      const result = handler(params);

      if (result instanceof MyCustomPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }
}

const promise = new MyCustomPromise((resolve, reject) => {
  resolve(10);
  resolve(10);
  reject("20");
});

promise
  .then((res) => {
    console.log(res);
    return new MyCustomPromise((resolve) => resolve(30));
  })
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
