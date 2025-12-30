

function myReduce(callback, initial){

    const arr = this;
    const len = arr.length;
    let result = initial;

    for(let i = 0; i < len; i ++){
        result = callback(result, arr[i], i);
    }

    return result;

}

Array.prototype.reduce = myReduce;

const array = [1,2,3,4,5];
const initialValue = 10;

const result = array.reduce(
    (accumulator, item) => accumulator + item,
    initialValue,
)

console.log(result);