const reduceBasic = (array, callback, initialValue) => {
  console.log("**************** [reduceBasic Start] ****************");
  let finalOutput = initialValue;
  const len = array.length;
  for (let i = 0; i < len; i++) {
    finalOutput = callback(finalOutput, array[i]);
  }
  console.log("**************** [reduceBasic End] ****************");
  return finalOutput;
};

function reduceCustom(callback, initialValue) {
  console.log("**************** [reduceCustom Start] ****************");
  let finalOutput = initialValue;
  const array = this;
  const len = array.length;
  for (let i = 0; i < len; i++) {
    finalOutput = callback(finalOutput, array[i]);
  }
  console.log("**************** [reduceCustom End] ****************");
  return finalOutput;
}

const array = [1, 2, 3, 4, 5];

Array.prototype.reduce = reduceCustom;

const result = array.reduce((accumulator, item) => {
  return (accumulator *= item);
}, 1);
console.log(result);
