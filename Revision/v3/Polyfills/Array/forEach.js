function myForEach(executor) {
  let arr = this;
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    executor(arr[i], i);
  }
}

Array.prototype.forEach = myForEach;

let array = [1, 2, 3, 4];

array.forEach((item) => console.log(item));
