function myCall(thisObject, ...args) {
  thisObject.functionToCall = this;
  return thisObject.functionToCall(...args);
}

const user = {
  name: "Shreyansh",
  getName: function () {
    return this.name;
  },
};

const person = {
  name: "John",
};

Function.prototype.myCall = myCall;

const name = user.getName();
console.log(name);

const personName = user.getName.call(person);
console.log(personName);

const getBindName = user.getName.myCall(user);
console.log(getBindName);
