


const unshiftBasic = (array, ...rest) => {
    return [...rest, ...array];
}


function unshiftCustom(...rest){
    const array = [...rest, ...this];
    return array;
}

// updating the same array by shifting the elements
function unshiftMutation(...rest){
    const newItems = rest;
    const newItemsCount = newItems.length;
    const len = this.length;

    for(let i = len - 1; i >= 0; i--){
        this[i + newItemsCount] = this[i];
        this[i] = null;
    }

    for(let i = 0; i < newItemsCount; i++){
        this[i] = rest[i];
    }

    return this;
    
}


const sampleArray = [1,2,3,4];

let result = unshiftBasic(sampleArray, 4);

// console.log(result);

Array.prototype.unshift = unshiftMutation;
result = sampleArray.unshift(4,5);
console.log(result);

