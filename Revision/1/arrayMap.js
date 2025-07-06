function customMap(callback) {
  const array = this;
  const length = array.length;
  const newArray = [];

  for (let i = 0; i < length; i++) {
    const result = callback.call(this, array[i], i);
    newArray.push(result);
  }

  return newArray;
}
