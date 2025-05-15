const PROMISE_STATE_MAP = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};

class CustomPromise {
  constructor(executor) {
    this.executor = executor;
    this.promiseState = PROMISE_STATE_MAP.PENDING;
    executor(this.resolve.bind(this), this.reject.bind(this));

    this.successHandlers = [];
    this.failureHandlers = [];

    this.resolveOrRejectParams = null;
  }

  resolve(params) {
    this.updatePromiseState(PROMISE_STATE_MAP.FULLFILLED);
    this.successHandlers.forEach((handler) => handler(params));
    this.resolveOrRejectParams = params;
  }

  reject(params) {
    this.updatePromiseState(PROMISE_STATE_MAP.REJECTED);
    this.failureHandlers.forEach((handler) => handler(params));
    this.resolveOrRejectParams = params;
  }

  then(thenCallback) {
    if (this.promiseState === PROMISE_STATE_MAP.FULLFILLED) {
      thenCallback(this.resolveOrRejectParams);
    } else {
      this.successHandlers.push(thenCallback);
    }
    return this.getChainingObject();
  }

  catch(catchCallback) {
    if (this.promiseState === PROMISE_STATE_MAP.REJECTED) {
      catchCallback(this.resolveOrRejectParams);
    } else {
      this.failureHandlers.push(catchCallback);
    }
    return this.getChainingObject();
  }

  /*
        Utility Methods
    */

  updatePromiseState(newState) {
    this.promiseState = newState;
  }

  getChainingObject() {
    const obj = { then: this.then.bind(this), catch: this.catch.bind(this) };
    return obj;
  }

  handleCallToHandlers(){
    
  }
}

const promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => reject(" World"), 2 * 1000);
});

promise
  .then((result) => console.log(result))
//   .then((res) => console.log("new", res))
//   .then((res) => {
//     console.log("2", res);
//     throw new Error("Error");
//   })
  .catch((error) => console.log("error : ", error ));

setTimeout(() => promise.then((result) => console.log(result)), 3 * 1000);
