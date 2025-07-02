class Person {
  constructor() {
    this.stepsTaken = 0;
  }

  walk() {
    this.stepsTaken++;
  }

  getStepsCount() {
    return this.stepsTaken;
  }
}

const elon = new Person();
elon.walk();
console.log(elon.getStepsCount());
