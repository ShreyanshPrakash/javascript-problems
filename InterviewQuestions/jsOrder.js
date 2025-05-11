// console.log("a");

// setTimeout(() => {
//    console.log("b")
// });

// const promise = new Promise((resolve) => {
//     console.log("e");
//     resolve("c");
// });

// promise.then((result) => {
//     console.log(result);
// });

// console.log("d");

// output : a, e, d, c, b

console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4))); // go added to macrotask queue once it is taken out from microtask queue. Hence last

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);

// output : 1, 7, 3, 5, 2, 6, 4
