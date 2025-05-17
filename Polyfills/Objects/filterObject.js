function filterObject(callback) {
  const objInst = this;
  const newObj = Object.create({});

  for (let key in objInst) {
    const value = objInst[key];
    const result = callback(value);
    if (result) {
      newObj[key] = value;
    }
  }

  return newObj;
}

const user = {
  name: "Shreyansh",
  age: 20,
};

Object.prototype.filter = filterObject;

const result = user.filter(
  (propertyValue) => typeof propertyValue === "string"
);
console.log(result);
