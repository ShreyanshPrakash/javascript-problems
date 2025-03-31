const generateFibonacciSeries = (itemCount = 2) => {
  let fibonacciArray = [0, 1];

  if (itemCount <= 2) {
    return fibonacciArray;
  }

  for (let i = 2; i < itemCount; i++) {
    const current = fibonacciArray[i - 1];
    const last = fibonacciArray[i - 2];
    const sum = current + last;
    fibonacciArray.push(sum);
  }

  return fibonacciArray;
};

let result = generateFibonacciSeries(5);
console.log(result);

result = generateFibonacciSeries(10);
console.log(result);

result = generateFibonacciSeries();
console.log(result);
