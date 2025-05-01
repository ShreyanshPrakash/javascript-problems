const memoize = (callback, ...args) => {
  let memoizeMap = {};

  const returnMethod = (...args) => {
    const argsString = args.join(",");
    if (memoizeMap[argsString]) {
      console.log("Memoized result");
      return memoizeMap[argsString];
    } else {
      const result = callback(...args);
      memoizeMap[argsString] = result;
      return result;
    }
  };

  return returnMethod;
};

const add = (a, b) => {
  console.log("new Entry");
  return a + b;
};

const memoizedAdd = memoize(add);

let result = memoizedAdd(5, 5);
console.log(result);

result = memoizedAdd(5, 5);
console.log(result);

result = memoizedAdd(10, 5);
console.log(result);

result = memoizedAdd(5, 10);
console.log(result);

result = memoizedAdd(5, 5);
console.log(result);
