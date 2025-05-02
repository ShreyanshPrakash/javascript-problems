const recursion = (payload) => {
  let result = {};

  const recursiveMethod = (payload, loopKey) => {
    for (let [key, value] of Object.entries(payload)) {
      const delimeter = loopKey ? "." : "";
      const newKey = loopKey + delimeter + key;
      if (typeof value === "object") {
        recursiveMethod(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  };

  recursiveMethod(payload, "");
  return result;
};

const data = {
  1: {
    2: 0,
    3: 1,
  },
  4: {
    5: {
      6: 7,
      8: 9,
    },
  },
};

const result = recursion(data);
console.log(result);
