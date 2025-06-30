


function myBind(thisArg, ...args){

    thisArg.fnToCall = this;
    return function(...newArgs){
        const allArgs = [...args, ...newArgs];
        return thisArg.fnToCall(...allArgs);
    }
}

function myCall(thisArg, ...args){
    thisArg.fnToCall = this;
    return thisArg.fnToCall(...args);
}

function myApply(thisArg, args){
    thisArg.fnToCall = this;
    return thisArg.fnToCall(...args);
}