

function myApply(obj, [args]){

    obj.funcToCall = this;
    return obj.funcToCall(...args);

}