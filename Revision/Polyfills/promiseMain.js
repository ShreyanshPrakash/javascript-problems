const MY_PROMISE_STATE = {
  FULLFILLED: "fullfilled",
  PENDING: "peding",
  REJECTED: "rejected",
};

class MyPromise {
  #resolutionHandlerList;
  #rejectionHandlerList;

  constructor(executor) {
    this.executor = executor;

    this.status = MY_PROMISE_STATE.PENDING;
    this.params = null;

    this.#resolutionHandlerList = [];
    this.#rejectionHandlerList = [];

    this.executor.call(this, this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(params) {
    // why queueMicroTask before the if statement.
    // Ideally we should check if its pending then only create a queue task right ?
    // else when there is non pending tasks also, an empty queue task will be created
    // ANS : if u put the if statement before the queueMicroTaks, then even if it passes the condition
    // the changes wont be applied immediately like update status as it will be in the micro queue
    // hence if user has added other sync code or have called resolve or reject twice,
    // the reoslve and reject will get executed even though resolve was called before
    queueMicrotask(() => {
      if (this.isPending()) {
        this.status = MY_PROMISE_STATE.FULLFILLED;
        this.params = params;
        // it will enter this block only when it was in pending
        // and now we have changed the state to fullfilled
        // hence, if any then handlers are there, run them
        this.#runResolutionHandlers();
      }
    });
  }

  #reject(params) {
    queueMicrotask(() => {
      if (this.isPending()) {
        this.status = MY_PROMISE_STATE.REJECTED;
        this.params = params;
        this.#runRejectionHandlers();
      }
    });
  }

  then(resolutionHandler, rejectionHandler) {
    // returning a new promise as that will help in the chaning
    return new MyPromise((resolve, reject) => {
      // the 'value' params will be this.params
      // this will be inserted when we iterate over the handlers and call them
      const thenHandler = (value) => {
        if (!resolutionHandler) {
          return resolve(value);
        }

        try {
          const result = resolutionHandler(value);
          // if the resolutionHandler itself returning a promise
          // then pass the resolve and reject as resolutionHandler and rejectHandler
          // such that when the then is executed for that promise,
          // it will call this resolve and reject
          if (result instanceof MyPromise) {
            result.then(resolve, reject); // try catch
          } else {
            return resolve(result);
          }
        } catch (error) {
          return reject(error);
        }
      };

      const catchHandler = (value) => {
        if (!rejectionHandler) {
          return reject(value);
          // why return reject() ?
          // if mainly reject and then return
          // we dont wan the further execution of the function
        }

        try {
          const result = rejectionHandler(value);

          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            return resolve(result);
          }
        } catch (error) {
          return reject(error);
        }
      };

      this.#resolutionHandlerList.push(thenHandler);
      this.#rejectionHandlerList.push(catchHandler);

      if (this.state === MY_PROMISE_STATE.FULLFILLED) {
        this.#runResolutionHandlers();
      } else if (this.state === MY_PROMISE_STATE.REJECTED) {
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

  isPending() {
    return this.status === MY_PROMISE_STATE.PENDING;
  }
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello world");
    reject("Error Reject");
  }, 2 * 1000);
});

promise
  .then((res) => {
    console.log("Then : ", res);
    throw "Value";
  })
  .then((res) => console.log(res))
  .catch((error) => console.log("Error : ", error));
