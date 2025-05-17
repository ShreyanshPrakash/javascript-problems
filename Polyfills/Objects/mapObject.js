function mapObject(callback) {
  const objInst = this;
  let newObj = {};

  const objInstEntries = Object.entries(objInst);

  for (let [key, value] of objInstEntries) {
    const newValue = callback({ [key]: value });
    newObj = {
      ...newObj,
      ...newValue,
    };
  }

  return newObj;
}

Object.prototype.map = mapObject;

const user = {
  name: "Shreyansh",
  age: 20,
};

const result = user.map((property) => {
  if (property["name"]) {
    return { name: "NewName" };
  }
  return property;
});
console.log(result);
