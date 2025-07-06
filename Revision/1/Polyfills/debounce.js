


function debounce(callback, delay){

    let timerId = null;

    return function(...args){
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.call(this, ...args);
        }, delay)
    }

}