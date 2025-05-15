const person = {
  name: "Shreyansh",
  age: 20,
};

person[Symbol.iterator] = function () {
  const keys = Object.keys(this);

  return {
    current: 1,
    last: keys.length,

    next() {
      if (this.current <= this.last) {
        this.current++;
        return { done: false, value: this.current };
      }
      return { done: true, value: this.current };
    },
  };
};


for(let item of person){
    console.log(item);
}