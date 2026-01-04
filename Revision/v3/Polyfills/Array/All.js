function myFilter(callback) {
  const arr = this;
  const len = arr.length;
  let result = [];

  for (let i = 0; i < len; i++) {
    if (callback(arr[i], i)) {
      result.push(arr[i]);
    }
  }

  return result;
}

function myForEach(callback) {
  const arr = this;
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    callback(arr[i], i);
  }
}

function isArray(item) {
  const isArray = Object.prototype.toString.call(item) === "[object Array]";
  return isArray;
}

function myJoin(delimeter) {
  const arr = this;
  const len = arr.length;
  let result = "";

  for (let i = 0; i < len; i++) {
    result += arr[i];
    if (i !== len) {
      result += delimeter;
    }
  }

  return result;
}

function myMap(callback) {
  const arr = this;
  const len = arr.length;
  const result = [];

  for (let i = 0; i < len; i++) {
    const mappedItem = callback(arr[i], i);
    result.push(mappedItem);
  }
}

function myReduce(callback, initial) {
  const arr = this;
  const len = arr.length;

  let result = initial;

  for (let i = 0; i < len; i++) {
    result = callback(result, arr[i], i);
  }

  return result;
}

function myPush(item) {
  let arr = this;
  let len = arr.length;

  arr[len] = item;

  return arr;
}

function myUnShift(item) {
  let arr = this;
  let len = arr.length;

  for (let i = len - 1; i > 0; i--) {
    arr[i + 1] = arr[i];
  }

  arr[0] = item;

  return arr;
}

function myShift(item) {
  let arr = this;
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length = len - 1;
  return arr;
}
