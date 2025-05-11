function Person() {
  this.name = "Shreyansh Prakash";
  this.age = 20;

  // This is called initially when the function is called with the new keyword
  arrow = () => {
    console.log("Created");
  }

  arrow();
}

const person = new Person();
console.log(person);
