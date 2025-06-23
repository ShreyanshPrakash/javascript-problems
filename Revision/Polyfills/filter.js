


function myFilter(callback){

    const arr = this;
    let result = [];

    for(let i = 0; i < arr.length; i++){
        if(callback.call(this, item, i)){
            result.push(item);
        }
    }

    return result;

}