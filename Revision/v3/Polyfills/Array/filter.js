function myFilter(callback) {
  const arr = this;
  const len = arr.length;
  let resultArr = [];

  for (let i = 0; i < len; i++) {
    if (callback(arr[i], i)) {
      resultArr.push(arr[i]);
    }
  }

  return resultArr;
}

Array.prototype.filter = myFilter;

let array = [1, 2, 3, 4];

let result = array.filter((item) => item > 2);

console.log(result);
