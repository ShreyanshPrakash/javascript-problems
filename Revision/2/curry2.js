function curry(fn) {
  return function curryied(...args) {
    if (args.length === fn.length) {
      return fn.call(this, ...args);
    }

    return (...newArgs) => curryied.apply(this, [...args, ...newArgs]);
  };
}

const sum = (a, b) => {
  return a + b;
};

const curriedSum = curry(sum);

console.log(curriedSum(1)(1));
console.log(curriedSum(1));
console.log(curriedSum(1, 2));
