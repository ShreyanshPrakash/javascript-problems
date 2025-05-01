const shiftBasic = (array) => {
    const len = array.length;
    for(let i = 0; i < len; i++){
        array[i] = array[i + 1];
    }
    array.length = len - 1;
    return array;
}


function shiftCustom(){
    const array = this;
    const len = array.length;

    for(let i = 0; i < len; i++){
        array[i] = array[i + 1];
    }

    array.length = len - 1;
    return array;
}



const sampleArray = [1,2,3,4];

let result = shiftBasic(sampleArray);
console.log(result);

Array.prototype.shift = shiftCustom;
result = sampleArray.shift();
console.log(result);