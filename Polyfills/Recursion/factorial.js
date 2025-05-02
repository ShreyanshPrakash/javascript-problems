const getFactorial = (n) => {
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }

  return fact;
};

const recursiveFactorial = (n) => {
  if (n === 1) {
    return 1;
  }

  return n * recursiveFactorial(n - 1);
};

const n = 5;
let result = getFactorial(n);
console.log(result);

result = recursiveFactorial(n);
console.log(result);
