const charAtBasic = (string, atIndex) => {
  console.log("**************** [charAtBasic Start] ****************");
  let charAtIndex = "-1";
  const len = string.length;
  for (let i = 0; i < len; i++) {
    if (i === atIndex) {
      charAtIndex = string[i];
      break;
    }
  }
  console.log("**************** [charAtBasic End] ****************");
  return charAtIndex;
};

function charAtCustom(atIndex) {
  console.log("**************** [charAtCustom Start] ****************");
  let charAtIndex = "-1";
  const len = this.length;
  for (let i = 0; i < len; i++) {
    if (i === atIndex) {
      charAtIndex = this[i];
      break;
    }
  }
  console.log("**************** [charAtCustom End] ****************");
  return charAtIndex;
}

const sampleString = "Hello World";

String.prototype.charAt = charAtCustom;

const result = sampleString.charAt(4);
console.log(result);
