function myBind(newObj, ...args) {
  let func = this;
  newObj.func = func;

  return function (...newArgs) {
    const allArgs = [...args, ...newArgs];
    return newObj.func(...allArgs);
  };
}

const Person = {
  name: "Shreyansh",
  age: 10,
};

Person[Symbol.iterator] = function () {
  return {
    from: 0,
    to: 20,
    current: 0,

    next() {
      if (this.current <= this.to) {
        ++this.current;
        return { done: false, value: this.current };
      } else {
        return { done: true, value: this.current };
      }
    },
  };
};

for (let index of Person) {
  console.log(index);
}

function filterObject(callback) {
  const obj = this;
  const newObj = Object.create({});

  for (let [key, value] of Object.entries(obj)) {
    console.log(key, value);
    const result = callback.call(this, key, value);
    if (result) {
      newObj[key] = value;
    }
  }

  return newObj;
}

Object.prototype.filter = filterObject;

const result = Person.filter((key, value) => typeof value === "string");
console.log(result);
