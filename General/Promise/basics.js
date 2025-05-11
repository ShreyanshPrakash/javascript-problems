



const promise = new Promise((resolve, reject) => {
    console.log("Hello world");

    const successValue = {
        message: "Successful"
    }
    const errorValue = new Error("Something went wrong");

    resolve(successValue);
})


setTimeout(() => {
    promise.then(result => console.log(result));
}, 2 * 1000)

promise.then(result => console.log(result));

