const user = {
  firstName: "Shreyansh",
  lastName: "Prakash",
  fullName: this.firstName + " " + this.lastName, // does not work with this
  getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    // const fullName = user.firstName + " " + user.lastName; // This works as here u r referencing the outer variable
    return fullName;
  },
};

const fullName = user.getFullName();
console.log(fullName);




const testThisMethod = () => {



    let arrow = () => {
        const data = this.name;
        console.log(data);
    }

    arrow();

}

const person = {
    name: "Doctor",
}

person.test = testThisMethod;
person.test();