const multiply = (a, b) => {
  return a * b;
};

// using bind to fix the first argument of the function
const partialMultiple = multiply.bind(this, 2);

let result = partialMultiple(10);
console.log(result);

result = partialMultiple(20);
console.log(result);
