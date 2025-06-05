const PROMISE_STATE_MAP = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};

class MyPromise {
  constructor(executor) {
    this.executor = executor;
    this.state = PROMISE_STATE_MAP.PENDING;

    this.thenCallback = null;
    this.catchCallback = null;

    this.resolveValue = null;
    this.rejectValue = null;

    this.executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(res) {
    this.state = PROMISE_STATE_MAP.FULLFILLED;
    this.resolveValue = res;

    if (this.thenCallback) {
      this.thenCallback(res);
    }
  }

  reject(error) {
    this.state = PROMISE_STATE_MAP.REJECTED;
    this.rejectValue = error;

    if (this.catchCallback) {
      this.catchCallback(error);
    }
  }

  then(thenCallback) {
    this.thenCallback = thenCallback;

    if (this.state === PROMISE_STATE_MAP.FULLFILLED) {
      this.thenCallback(this.resolveValue);
    }

    return this;
  }

  catch(catchCallback) {
    this.catchCallback = catchCallback;

    if (this.state === PROMISE_STATE_MAP.FULLFILLED) {
      this.catchCallback(this.rejectValue);
    }

    return this;
  }
}

MyPromise.resolve = (res) => new MyPromise((resolve) => resolve(res)).resolveValue;
MyPromise.reject = (error) => new MyPromise((reject) => reject(error)).rejectValue;

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success");
  }, 2 * 1000)
});

promise.then((res) => {
    console.log("1", res)
    return "name";
}).then(res => console.log(res));


const result = MyPromise.resolve(10);
console.log(result);