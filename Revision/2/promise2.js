const MY_PROMISE_STATE = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};

class MyCustomPromise2 {
  #params;
  #resolutionHandlerList;
  #rejecttionHandlerList;

  constructor(executor) {
    this.executor = executor;
    this.state = MY_PROMISE_STATE.PENDING;
    this.#params = null;

    this.#resolutionHandlerList = [];
    this.#rejecttionHandlerList = [];

    this.executor(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(params) {
    queueMicrotask(() => {
      if (this.#isPending()) {
        this.state = MY_PROMISE_STATE.FULLFILLED;
        this.#params = params;
        this.#runResolutionHandlers();
      }
    });
  }

  #reject(params) {
    queueMicrotask(() => {
      if (this.#isPending()) {
        this.state = MY_PROMISE_STATE.REJECTED;
        this.#params = params;
        this.#runRejectionHandlers();
      }
    });
  }

  then(resolutionHandler, rejectionHandler) {
    return new MyCustomPromise2((resolve, reject) => {
      const thenHandler = (value) => {
        if (!resolutionHandler) {
          return resolve(value);
        }

        try {
          const result = resolutionHandler(value);

          if (result instanceof MyCustomPromise2) {
            result.then(resolve, reject);
          } else {
            return resolve(result);
          }
        } catch (error) {
          return reject(error);
        }
      };

      const catchHandler = (value) => {
        if (!rejectionHandler) {
          return resolve(value);
        }

        try {
          const result = rejectionHandler(value);

          if (result instanceof MyCustomPromise2) {
            result.then(resolve, reject);
          } else {
            return resolve(result);
          }
        } catch (error) {
          return reject(error);
        }
      };

      this.#resolutionHandlerList.push(thenHandler);
      this.#rejecttionHandlerList.push(catchHandler);

      if (this.state === MY_PROMISE_STATE.FULLFILLED) {
        this.#runResolutionHandlers();
      } else if (this.state === MY_PROMISE_STATE.REJECTED) {
        this.#runRejectionHandlers();
      }
    });
  }

  catch(rejectionHandler) {
    return this.then(null, rejectionHandler);
  }

  /*
        Utility Methods
    */

  #runResolutionHandlers() {
    if (this.#resolutionHandlerList.length) {
      this.#resolutionHandlerList.forEach((handler) => handler(this.#params));
      this.#resolutionHandlerList = [];
    }
  }

  #runRejectionHandlers() {
    if (this.#rejecttionHandlerList.length) {
      this.#rejecttionHandlerList.forEach((handler) => handler(this.#params));
      this.#rejecttionHandlerList = [];
    }
  }

  #isPending() {
    return this.state === MY_PROMISE_STATE.PENDING;
  }
}

const promise = new MyCustomPromise2((resolve, reject) => {
  // synchornous code
  setTimeout(() => {
    resolve(10);
    reject(20);
  }, 1 * 1000);
});

const promise2 = new Promise((resolve, reject) => {
  // synchornous code
  setTimeout(() => {
    resolve(10);
    reject(20);
  }, 1 * 1000);
});

// promise
//   .then((res) => console.log("Success : ", res))
//   .then((res) => {
//     console.log(res);
//     // return new MyCustomPromise2((resolve, reject) => {
//     //     reject(new Error("Error Here"));
//     // });
//     // return new Error("Error Here");
//     dsa;
//     return 20;
//   })
//   .then((res) => console.log("Success 2: ", res))
//   .catch((error) => console.log("Error : ", error));

setTimeout(() => {
  promise
    .then((res) => console.log("Success : ", res))
    .then((res) => {
      console.log(res);
      // return new MyCustomPromise2((resolve, reject) => {
      //     reject(new Error("Error Here"));
      // });
      // return new Error("Error Here");
      dsa;
      return 20;
    })
    .then((res) => console.log("Success 2: ", res))
    .catch((error) => console.log("Error : ", error));
}, 3 * 1000);

const sum = () => {
  asdsa;
};

// const result = sum();
// console.log(result);

// try {
//     const result = sum();
//     console.log(result);
// }catch(error){
//     console.log(error);
// }
