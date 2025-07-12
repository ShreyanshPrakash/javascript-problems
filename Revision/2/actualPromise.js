



const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(10);
    }, 5 * 1000);
})


console.log(promise);