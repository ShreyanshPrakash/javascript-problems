const simpleFactorial = (n) => {
  let fact = 1;

  for (let i = 1; i <= n; i++) {
    fact *= i;
  }

  return fact;
};

const recursiveFactorial = (n, fact = 1) => {
  if (n <= 0) {
    return 1;
  } else {
    // fact(n) = n + fact(n-1, fact)
    fact = n * recursiveFactorial(n - 1, fact);
    return fact;
  }
};

console.log(simpleFactorial(4));
console.log(recursiveFactorial(4));
