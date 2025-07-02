/*

Abstraction in JavaScript, as in other programming languages, 
involves hiding complex implementation details and exposing only 
the necessary functionalities to the user. 
This simplifies interaction and reduces complexity

Abstraction in JavaScript (or any programming language) involves hiding 
the complex implementation details and showing only the necessary features of an object.
This helps in reducing complexity and increases the efficiency of 
the program by allowing the user to interact with the object at a higher level
*/

class CalculateMath {
  constructor() {}

  get PI() {
    // I have just get for PI
    // Hence, it wont allow any update to PI property
    return 3.14;
  }

  factorialOf(number) {
    return this.#findFactorial(number);
  }

  // abstracting this method
  #findFactorial(number) {
    let prd = 1;
    let count = 1;
    while (count <= number) {
      prd *= count;
      count++;
    }
    return prd;
  }
}

const math = new CalculateMath();
console.log(math.PI);

math.PI = 10;
console.log(math.PI);

console.log(math.factorialOf(5));

/*
    Another Better Exmaple
*/

class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  startEngine() {
    this.#checkEngine();
    console.log(`${this.make} ${this.model} engine started.`);
  }

  drive() {
    console.log(`${this.make} ${this.model} is driving.`);
  }

  #checkEngine() {
    console.log("Check engine...");
  }
}

const myCar = new Car("Tata", "Punch", 2024);
myCar.startEngine();
myCar.drive();
// myCar.#checkEngine(); //--> SyntaxError: Private field '#checkEngine'
