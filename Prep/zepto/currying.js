function curry(...args) {
  let sum = 0;
  function inner(...args) {
    if (!args.length) {
      return sum;
    }

    for (let arg of args) {
      sum += arg;
    }

    return inner;
  }

  return inner(...args);
}

function curry(fn) {
  return function curried(...args) {
    if (args.length === fn.length) {
      return fn.apply(this, args);
    }

    return (...args2) => curried.apply(this, [...args, ...args2]);
  };
}

const result = curry(10)(20)();
console.log(result);
