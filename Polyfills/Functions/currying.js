function useCurrySum(...args) {
  let sum = 0; // state variable as in react
  return returnMethod(...args);

  function returnMethod(...args) {
    if (!args.length) {
      return sum;
    }

    for (let param of args) {
      sum += param;
    }

    returnMethod.value = sum;
    return returnMethod;
  }
}

const result = useCurrySum(10)(20)(2, 4)();
console.log(result);
