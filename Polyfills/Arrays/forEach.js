const forEachBasic = (array, callback) => {
  console.log(
    "**************** [forEachBasic Start] ****************"
  );
  const len = array.length;
  for (let i = 0; i < len; i++) {
    callback(array[i], i);
  }
  console.log(
    "**************** [forEachBasic End] ****************"
  );
};

// we need function declaration as we need access to this object
function forEachCustom(callback) {
  console.log(
    "**************** [forEachCustom Start] ****************"
  );
  const len = this.length;
  for (let i = 0; i < len; i++) {
    callback(this[i], i);
  }
  console.log(
    "**************** [forEachCustom End] ****************"
  );
}

const sampleArray = [1, 2, 3, 4, 5];

/* 
    Adding the custom method to the Array prototype.
    This will attach custom method to all the array instances
*/
Array.prototype.forEach = forEachCustom;
sampleArray.forEach((item, index) => {
  console.log(item, index);
});

/*
    Adding the custom method to the array variable __proto__.
    This will attach custom method to just this variable's proto object
    __proto__ (local) tkaes precedence over prototype (global)
*/
sampleArray.__proto__.forEach = forEachCustom;
sampleArray.forEach((item, index) => {
  console.log(item, index);
});
