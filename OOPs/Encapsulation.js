/*

    Encapsulation means that all the properties and activities
    that makes sense together... u put them in a class together

Bundling the data (properties) and methods (functions) that operate on 
the data into a single unit, typically a class or an object.

It restricts direct access to some of the object's components, 
which can help prevent the accidental modification of data. 
Instead, interactions with the data are done through well-defined interfaces (methods).

*/

class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.age = age || "";
  }

  get firstName() {
    return this.firstName;
  }

  set firstName(name) {
    firstName = name;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    if (!name) {
      return;
    }
    const nameSplit = name.split(" ");
    this.firstName = nameSplit[0];
    this.lastName = nameSplit[1];
  }
}

const elon = new Person();
console.log(elon.fullName);
