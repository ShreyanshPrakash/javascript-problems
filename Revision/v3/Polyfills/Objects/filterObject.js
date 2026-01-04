


function myFilterObject(callback){

    const obj = this;
    const keys = Object.keys(obj);
    let result = {};

    for(let key of keys){

        if(callback(obj[key], key, obj)){
            result[key] = obj[key];
        }

    }

    return result;

}