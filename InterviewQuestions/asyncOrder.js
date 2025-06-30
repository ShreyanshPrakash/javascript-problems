
console.log(1);

setTimeout(() => {
    console.log(2)
}, 0)

console.log(
    Promise.resolve(3)
);

console.log(
    new Promise((resolve) => resolve(4))
)

console.log(
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(5)
        }, 0)
    })
)

Promise.resolve(6).then(res => console.log(res));

console.log(7);