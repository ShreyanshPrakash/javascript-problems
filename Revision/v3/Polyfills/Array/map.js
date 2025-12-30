

function myMap(callback){

    const arr = this;
    const len = arr.length;
    let result = [];

    for(let i = 0; i < len; i++){
        result.push(
            callback(arr[i], i)
        )
    }

    return result;
}


Array.prototype.map = myMap;

const array = [1,2,3,4,5];
let result = array.map(item => item * 2);
console.log(result);