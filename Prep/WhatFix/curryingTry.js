function sum(...args) {
  let sum = 0;

  function recursive(...newArgs) {
    if (!newArgs.length) {
      return sum;
    }

    for (let arg of newArgs) {
      sum += arg;
    }

    return recursive;
  }

  return recursive(...args);
}

console.log(sum(5)(10)());

function curry(func) {
  return function curried(...args) {
    if (func.length === args.length) {
      return func.apply(this, args);
    }

    return (...newArgs) => curried.apply(this, [...args, ...newArgs]);
  };
}

const sumFn = (a, b) => a + b;
const curriedSum = curry(sumFn);
console.log(curriedSum(2, 3));
console.log(curriedSum(2)(3));
