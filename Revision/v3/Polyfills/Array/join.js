

function myJoin(delimeter){

    const arr = this;
    const len = arr.length;
    let result = "";

    for(let i = 0; i < len; i++){
        result += arr[i];
        if(i !== len - 1){
            result += delimeter;
        }
    }

    return result;
}

Array.prototype.join = myJoin;

const array = [1,2,3,4,5];

const result = array.join(",");

console.log(result);