
let instance = null;

class Logger{
    constructor(){

        instance = this;
    }

    log(message){
        console.log(message);
    }

    warn(message){
        console.warn(message);
    }

    error(error){
        console.error(error);
    }
}