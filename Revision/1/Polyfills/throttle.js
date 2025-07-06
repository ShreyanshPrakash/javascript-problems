



function throttle(callback, delay){

    let shouldThrottle = false;

    return function(...args){

        setTimeout(() => {
            shouldThrottle = false;
        }, delay)

        if(!shouldThrottle){
            shouldThrottle = true;
            callback.call(this, ...args);
        }

    }


}


const callBackMethod = (message) => console.log(message);

const throttleMethod = throttle(callBackMethod, 500);

throttleMethod("One");
throttleMethod("Two");
throttleMethod("Three");

setTimeout(() => {
  throttleMethod("four");
}, 1200);

setTimeout(() => {
  throttleMethod("five");
}, 500);

setTimeout(() => {
  throttleMethod("six");
}, 1100);