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



/*
  Better
  The above one we cant re-use,
  Below one we can reuse
  Check : https://www.greatfrontend.com/questions/javascript/sum?format=javascript
*/

export default function sum(value) {
  function returnMethod(arg) {
    if (arg === undefined) {
      return value;
    }
    return sum(value + arg);
  }

  return returnMethod;
}



/*


function addTwo(a, b) {
  return a + b;
}
const curriedAddTwo = curry(addTwo);
curriedAddTwo(3)(4); // 7
curriedAddTwo(3, 4); // 7

*/