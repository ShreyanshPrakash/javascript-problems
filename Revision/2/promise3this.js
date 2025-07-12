const PROMISE_STATE = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};

class MyPromise20 {
  #executor;
  #status;
  #params;
  #handlers;

  constructor(executor) {
    this.#executor = executor;

    this.#status = PROMISE_STATE.PENDING;
    this.#params = null;
    this.#handlers = [];

    this.#executor(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(params) {
    this.#addToMicroTaskQueue(params, PROMISE_STATE.FULLFILLED);
  }

  #reject(params) {
    this.#addToMicroTaskQueue(params, PROMISE_STATE.REJECTED);
  }

  then(resolutionHandler, rejectionHandler) {
    if (resolutionHandler) {
      const thenHandler = (value) =>
        this.#createHandlers(resolutionHandler, value);
      this.#handlers.push({
        type: PROMISE_STATE.FULLFILLED,
        handler: thenHandler,
      });
    }

    if (rejectionHandler) {
      const catchHandler = (value) =>
        this.#createHandlers(rejectionHandler, value);
      this.#handlers.push({
        type: PROMISE_STATE.REJECTED,
        handler: catchHandler,
      });
    }

    this.#runHandlers();
    return this;
  }

  catch(rejectionHandler) {
    this.then(null, rejectionHandler);
    return this;
  }

  /*
        Utility Methods
    */

  #isPending() {
    return this.#status === PROMISE_STATE.PENDING;
  }

  #runHandlers() {
    if (this.#status === PROMISE_STATE.FULLFILLED) {
      this.#callNextHandler(this.#params, PROMISE_STATE.FULLFILLED);
    } else if (this.#status === PROMISE_STATE.REJECTED) {
      this.#callNextHandler(this.#params, PROMISE_STATE.REJECTED);
    }
  }

  #addToMicroTaskQueue(params, status) {
    queueMicrotask(() => {
      if (this.#isPending()) {
        this.#status = status;
        this.#params = params;
        this.#runHandlers();
      }
    });
  }

  #createHandlers(handler, value) {
    if (!handler) {
      return;
    }

    try {
      const result = handler(value);

      if (result instanceof MyPromise20) {
        result
          .then((res) => {
            this.#callNextHandler(res, PROMISE_STATE.FULLFILLED);
          })
          .catch((error) => {
            this.#callNextHandler(error, PROMISE_STATE.REJECTED);
          });
        return;
      } else {
        this.#callNextHandler(result, PROMISE_STATE.FULLFILLED);
        return;
      }
    } catch (error) {
      this.#callNextHandler(error, PROMISE_STATE.REJECTED);
      return;
    }
  }

  #callNextHandler(prevResult, handlerType) {
    if (this.#handlers.length) {
      const { type, handler } = this.#handlers.shift();
      if (type === handlerType) {
        handler(prevResult);
      } else {
        this.#callNextHandler(prevResult, handlerType);
      }
    }
  }
}

/*
    Execution
*/

const promise = new MyPromise20((resolve, reject) => {
  // synchornous code
  setTimeout(() => {
    resolve(10);
    reject(20);
  }, 1 * 1000);
});

promise
    .then((res) => console.log("Success : ", res))
  .then((res) => {
    console.log("Success 1 : ", res);
    // return new MyPromise20((resolve, reject) => {
    //   reject(new Error("Error Here"));
    // });
    // return new Error("Error Here");
    dsa;
    return 20;
  })
  .then((res) => {
    console.log("Success 2: ", res);
    return res * 2;
  })
  .catch((error) => console.log("Error : ", error))
  .then((res) => console.log("Success 3: ", res));

// setTimeout(() => {
//   promise
//     .then((res) => console.log("Success 1 : ", res))
//     .then((res) => {
//       console.log("Success 2 : ", res);
//       // return new MyCustomPromise2((resolve, reject) => {
//       //     reject(new Error("Error Here"));
//       // });
//       // return new Error("Error Here");
//       dsa;
//       return 20;
//     })
//     .then((res) => console.log("Success 3 : ", res))
//     .catch((error) => console.log("Error : ", error));
// }, 3 * 1000);
