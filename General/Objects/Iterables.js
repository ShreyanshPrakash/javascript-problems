const user = {
  name: "Shreyansh",
  age: 20,

  from: 1,
  to: 20,
};

user[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    name: this.name,

    next() {
      if (this.current <= this.last) {
        ++this.current;
        return {
          done: false,
          value: `${this.name}-${this.current}`,
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
};

for (let item of user) {
  console.log(item);
}
