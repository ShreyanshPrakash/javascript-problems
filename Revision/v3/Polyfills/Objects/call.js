
function myCall(obj, ...args){

    obj.funcToCall = this;
    return obj.funcToCall(...args);


}