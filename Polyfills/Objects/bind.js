function myBind(thisObject, ...args) {
  const callFunction = this;

  return function (...callArgs) {
    const allArgs = [...args, ...callArgs];
    return callFunction.call(thisObject, ...allArgs);
  };
}



/*
    what is this and how its mapped...
    so this is taken from the object on which the function is called.
    In below case....since we are getting the new this as the parameter,
    we added the function to call to the newThis object...
    now when we call the function to call, the this inside that function
    will automaticaly get mapped to the thisObject.
    No need to use apply/ call
*/
function bindWithoutCall(thisObject, ...args){

    const callFunction = this;
    thisObject.funcToCall = callFunction;

    return function(...callArgs){
      // we should merge both the args as we might bind the funciton partially
        const allArgs = [...args, ...callArgs];
        return thisObject.funcToCall(allArgs);
    }
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

Function.prototype.myBind = bindWithoutCall;

const name = user.getName();
console.log(name);

const personName = user.getName.call(person);
console.log(personName);


const getBindName = user.getName.myBind(person);
console.log(getBindName());
