const person = {
  name: "Shreyansh",
  age: 20,

  [Symbol.iterator]: function () {
    return {
      currentIndex: -1,
      lastIndex: Object.keys(person).length,
      allKeys: Object.keys(person),

      next() {
        if (this.currentIndex <= this.lastIndex) {
          this.currentIndex++;
          return { done: false, value: {
            index: this.currentIndex,
            result: person[this.allKeys[this.currentIndex]],
          } };
        }
        return { done: true, value: this.currentIndex };
      },
    };
  },
};

for (let item of person) {
  console.log(item);
}
