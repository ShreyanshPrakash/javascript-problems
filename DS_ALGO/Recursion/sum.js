const simpleSum = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

const recursiveSum = (n, sum = 0) => {
  // In normal case u will assign sum an initial value as 0
  // In recurse that is you base case
  if (n <= 0) {
    // if n value is 0, then the sum is 0
    // if n value is 1, then the sum is 1
    // if n value is 2, then the sum is 3 (1 + 2) => we cant take this as base
    // cause we are dependent on previous value to derive this.

    // Pay attention, its coming out to be like fibonacci series pattern
    return 0; // or return n..
  } else {
    // sum(n) = n + sum(n - 1)
    sum = n + recursiveSum(n - 1, sum);
    // if say u want to receive the result of the fuaction for say some processing..
    // then u must pass the same as parameter to the function as well.
    // else u can just return directly
    // return n + recursiveSum(n - 1)
    return sum;
  }
};

// console.log(simpleSum(4));

console.log(recursiveSum(4));
