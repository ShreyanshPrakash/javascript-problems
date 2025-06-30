const MY_PROMISE_STATUS = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};

class NewPromise {
  #thenHandlers;
  #rejectHandlers;

  constructor(executor) {
    this.executor = executor;

    this.params = null;
    this.status = MY_PROMISE_STATUS.PENDING;

    this.#thenHandlers = [];
    this.#rejectHandlers = [];

    this.executor(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(params) {
    queueMicrotask(() => {
      if (this.#isPending()) {
        this.status = MY_PROMISE_STATUS.FULLFILLED;
        this.params = params;
        this.#runThenHandlers();
      }
    });
  }

  #reject(params) {
    queueMicrotask(() => {
      if (this.#isPending()) {
        this.status = MY_PROMISE_STATUS.REJECTED;
        this.params = params;
        this.#runRejectHandlers();
      }
    });
  }

  then(resolutionHandler, rejectionHandler) {
    return new Promise((resolve, reject) => {
      const thenHandler = (value) => {
        if (!resolutionHandler) {
          return resolve(value);
        }

        try {
          const result = resolutionHandler(value);

          if (result instanceof NewPromise) {
            result.then(resolve, reject);
          } else {
            return resolve(value);
          }
        } catch (error) {
          return reject(error);
        }
      };

      const catchHandler = (value) => {
        if (!rejectionHandler) {
          return reject(value);
        }

        try {
          const result = rejectionHandler(value);

          if (result instanceof NewPromise) {
            result.then(resolve, reject);
          } else {
            return resolve(value);
          }
        } catch (error) {
          return reject(error);
        }
      };

      this.#thenHandlers.push(thenHandler);
      this.#rejectHandlers.push(catchHandler);

      if (this.status === MY_PROMISE_STATUS.FULLFILLED) {
        this.#runThenHandlers();
      } else if (this.status === MY_PROMISE_STATUS.REJECTED) {
        this.#runRejectHandlers();
      }
    });
  }

  catch(rejectionHandler) {
    this.then(null, rejectionHandler);
  }

  /*
        Helped Methods
    */

  #runThenHandlers() {
    if (this.#thenHandlers.length) {
      this.#thenHandlers.forEach((handler) => handler(this.params));
      this.#thenHandlers = [];
    }
  }

  #runRejectHandlers() {
    if (this.#rejectHandlers.length) {
      this.#rejectHandlers.forEach((handler) => handler(this.params));
      this.#rejectHandlers = [];
    }
  }

  /*
        Utility Methods
    */

  #isPending() {
    return this.status === MY_PROMISE_STATUS.PENDING;
  }
}

const promise = new NewPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
    reject("error");
  }, 2 * 1000);
});

promise.then((res) => console.log(res)).catch((err) => console.log(err));
