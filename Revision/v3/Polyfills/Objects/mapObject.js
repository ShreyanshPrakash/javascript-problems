

function myMapObject(callback){

    const obj = this;
    const result = Object.create({});

    for(let key in obj){

        result[key] = callback(obj[key], key, obj);

    }

    return result;

}