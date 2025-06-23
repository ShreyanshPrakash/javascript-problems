


// function curry(...args){
//     let sum = 0;

//     function inner(...args){
//         if(args.length === 0){
//             return sum;
//         }
//         for(let arg of args){
//             sum += arg;
//         }
//         return inner;
//     }

//     return inner(...args);

// }


// const result = curry(5)(10)();
// console.log(result);


function add(a, b) {
  return a + b;
}

export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (param) => {
      if (param === undefined) {
        return curried.apply(this, args);
      }
      return curried.apply(this, [...args, param]);
    };
  };
}

const curriedAdd = curry(add);
let result = curriedAdd(3)(4); // 7
console.log(result);

const alreadyAddedThree = curriedAdd(3);
alreadyAddedThree(4); // 7