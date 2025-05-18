function Pipe(params) {
  this.result = params;
  this.and = and;
  this.equals = equals;

  function equals() {
    return this.result;
  }

  function and(callback) {
    const newValue = callback(this.result);
    this.result = newValue;
    return this;
  }
}

const initialValue = 10;

const result = new Pipe(initialValue)
  .and((result) => result * 1)
  .and((result) => result + 10)
  .equals();
console.log(result);
