


function myApply(thisObject, [args]){
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

Function.prototype.myApply = myApply;

const name = user.getName();
console.log(name);

const personName = user.getName.apply(person);
console.log(personName);


const getBindName = user.getName.myApply(user);
console.log(getBindName);