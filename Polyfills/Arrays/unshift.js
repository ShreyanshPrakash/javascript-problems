


const unshiftBasic = (array, ...rest) => {
    return [...rest, ...array];
}


function unshiftCustom(...rest){
    const array = [...rest, ...this];
    return array;
}


const sampleArray = [1,2,3,4];

let result = unshiftBasic(sampleArray, 4);

console.log(result);

Array.prototype.unshift = unshiftCustom;
result = sampleArray.unshift(4,5);
console.log(result);

