



export default function dropRightWhile(array, predicate) {
  let len = array.length;
  let endIndex = len - 1;

  for (let i = len - 1; i >= 0; i--) {
    const result = predicate(array[i], i, array);
    if (result) {
      endIndex = i - 1;
    }else{
        break;
    }
  }

  return array.slice(0, endIndex + 1);
}

// export default function dropRightWhile(array, predicate) {
//   let index = array.length - 1;

//   while (index >= 0 && predicate(array[index], index, array)) {
//     index--;
//   }
  
//   return array.slice(0, index + 1);
// }

const result = dropRightWhile([1, 2, 3], (value, _index, _array) => value < 6);
console.log(result);