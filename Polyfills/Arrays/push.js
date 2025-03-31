
const pushBasic = (array, item) => {
    let len = array.length;

    array[len] = item;

    return array;
}


function pushCustom(item){
    let array = this;
    let len = array.length;

    array[len] = item;

    return array;
}


const sampleArray = [1,2,3,4];
let result = pushBasic(sampleArray, 5);
console.log(result);


Array.prototype.push = pushCustom;
result = sampleArray.push(10);
console.log(result);