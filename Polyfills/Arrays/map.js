const mapBasic = (array, callback) => {
  console.log("**************** [mapBasic Start] ****************");
  let finalArray = [];
  const len = array.length;

  for (let i = 0; i < len; i++) {
    const mappedItem = callback(array[i], i);
    finalArray.push(mappedItem);
  }
  console.log("**************** [mapBasic End] ****************");
  return finalArray;
};

function mapCustom(callback) {
  console.log("**************** [mapCustom Start] ****************");
  let finalArray = [];
  const len = this.length;

  for (let i = 0; i < len; i++) {
    const mappedItem = callback(this[i], i);
    finalArray.push(mappedItem);
  }
  console.log("**************** [mapCustom End] ****************");
  return finalArray;
}

const sampleArray = [1, 2, 3, 4, 5];

Array.prototype.map = mapCustom;

const result = sampleArray.map((item, index) => item * 2);
console.log(result);
