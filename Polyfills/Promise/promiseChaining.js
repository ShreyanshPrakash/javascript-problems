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

    this.handlerExecutionIndex = 0;

    this.executor(this.#resolve.bind(this), this.#reject.bind(this));
    this.handleHandlers.bind(this);
  }

  #resolve(res) {
    /*
      Only run if the state is/ was still pending
      if already rejected, then dont trigger
      if already resolved, still dont trigger
      -> maybe throw or warn ?
      [ToDo] : => Add the execution to queueMicroTask(() => {})
    */
    if (this.state === PROMISE_STATE_MAP.PENDING) {
      this.state = PROMISE_STATE_MAP.FULLFILLED;
      this.promiseValue = res;

      this.handleHandlers();
    }
  }

  #reject(error) {
    /*
      Only run if the state is/ was still pending
      if already rejected, then dont trigger
      if already resolved, still dont trigger
      -> maybe throw or warn ?
      [ToDo] : => Add the execution to queueMicroTask(() => {})
    */
    if (this.state === PROMISE_STATE_MAP.PENDING) {
      this.state = PROMISE_STATE_MAP.REJECTED;
      this.promiseValue = error;

      this.handleHandlers();
    }
  }

  then(thenCallback) {
    this.handlers.push({
      type: PROMISE_STATE_MAP.FULLFILLED,
      handler: thenCallback,
    });

    if (this.state === PROMISE_STATE_MAP.FULLFILLED) {
      this.handleHandlers();
    }

    return this;
  }

  catch(catchCallback) {
    this.handlers.push({
      type: PROMISE_STATE_MAP.REJECTED,
      handler: catchCallback,
    });

    if (this.state === PROMISE_STATE_MAP.REJECTED) {
      this.handleHandlers();
    }

    return this;
  }

  finally(finallyCallback){
    // maybe, there can be only one finally
    // so keep it in other variable and call it only once all handlers are exhausted
  }

  /*
    Utility Methods
  */

    /*
      If there are no catch handlers and there is an error,
      throw new UncaughtPromiseError()
    */
  handleHandlers() {
    while (this.handlerExecutionIndex <= this.handlers.length - 1) {
      const { type, handler } = this.handlers[this.handlerExecutionIndex];
      //   this.handlers.shift();
      // array shift will every time shift all the elements in the array
      // Hence not good. Better use a counter to track the handler to trigger
      this.handlerExecutionIndex++;

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

  static all(promises){
    // handle all promises
    const promise = new MyPromise(() => {});
    console.log(promise);
  }
}

/*
  External Utility methods
  Attach directly to the call so that they can be called as part of the MyPromise
  -> MyPromise.all, MyPromise.allSettled, MyPromise.race etc
  OR, add them as static methods...check above
*/
MyPromise.resolve = (res) =>
  new MyPromise((resolve) => resolve(res)).promiseValue;
MyPromise.reject = (error) =>
  new MyPromise((reject) => reject(error)).promiseValue;


/*
  UncaughtPromiseError
*/

class UncaughtPromiseError extends Error{
  constructor(error){
    super(error);

    this.stack = `(in Promise) : ${error.stack}`;
  }
}

/*
  Runners with examples, sync and async
*/

const promise = new MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  resolve("Success");
  //   reject("Reject");
  //   }, 2 * 1000);
});

promise
  .then((res) => {
    console.log("1", res);
    throw new Error("Whoops!");
  })
  .then((res) => console.log("2", res))
  .catch((error) => console.log("3", error))
  .then((res) => {
    console.log(res);
    return "last";
  });

const result = MyPromise.resolve(10);
console.log(result);

setTimeout(() => {
  promise.then((res) => console.log("Late 1", res));
}, 4 * 1000);
