

function myPush(item){

    const arr = this;
    const len = arr.length;

    arr[len] = item;
    return arr;
}

Array.prototype.push = myPush;

const array = [1,2,3,4,5];
const item = 10;

const result = array.push(item);
console.log(result);
console.log(array);