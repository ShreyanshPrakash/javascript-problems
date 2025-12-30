
function myIsArray(arg){
    const isArray = Object.prototype.toString.call(arg) === "[object Array]";
    return isArray;
}