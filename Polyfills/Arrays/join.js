const joinBasic = (array, delimeter) => {
  console.log("**************** [joinBasic Start] ****************");

  let joinString = "";
  const len = array.length;

  for (let i = 0; i < len; i++) {
    const item = array[i];
    joinString += item;
    if (i !== len - 1) {
      joinString += delimeter;
    }
  }

  console.log("**************** [joinBasic End] ****************");
  return joinString;
};

function joinCustom(delimeter) {
  console.log("**************** [joinCustom Start] ****************");
  let joinString = "";
  const len = this.length;

  for (let i = 0; i < len; i++) {
    const item = this[i];
    joinString += item;
    if (i !== len - 1) {
      joinString += delimeter;
    }
  }
  console.log("**************** [joinCustom End] ****************");
  return joinString;
}

const sampleArray = [1,2,3,4,5];

Array.prototype.join = joinCustom;

const result = sampleArray.join("*");
console.log(result);
