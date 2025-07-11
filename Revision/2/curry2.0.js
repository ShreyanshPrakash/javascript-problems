function curry(fn) {
  return function curried(...args) {
    if (fn.length === args.length) {
      return fn.call(this, ...args);
    }

    return (...nextArgs) => curried.apply(this, [...args, ...nextArgs]);
  };
}

const sum = (a, b) => {
  return a + b;
};

const curriedSum = curry(sum);
console.log(curriedSum(2)(3));
console.log(curriedSum(2, 3));
