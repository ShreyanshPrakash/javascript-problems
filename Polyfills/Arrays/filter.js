const filterBasic = (array, callback) => {
  console.log("**************** [filterBasic Start] ****************");
  let filteredArray = [];
  const len = array.length;
  for (let i = 0; i < len; i++) {
    const result = callback(array[i], i);
    if (result) {
      filteredArray.push(array[i]);
    }
  }
  console.log("**************** [filterBasic Start] ****************");
  return filteredArray;
};

function filterCustom(callback) {
  console.log("**************** [filterCustom Start] ****************");
  let filteredArray = [];
  const len = this.length;
  for (let i = 0; i < len; i++) {
    const result = callback(this[i], i);
    if (result) {
      filteredArray.push(this[i]);
    }
  }
  console.log("**************** [filterCustom Start] ****************");
  return filteredArray;
}


const sampleArray = [1,2,3,4,5];

Array.prototype.filter = filterCustom;

const result = sampleArray.filter((item, index) => item < 4)
console.log(result);
