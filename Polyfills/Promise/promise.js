

class PromiseCustom{
    constructor(callback){
        callback(this.#resolve, this.#reject);
        this.resolveParams = null;
        this.rejectParams = null;
    }


    #resolve(params){
        setTimeout(() => {
            // console.log("resolve")
            this.resolveParams = params;
            this.then(params);
        })
    }

    #reject(params){
     setTimeout(() => {
        // throw new Error();
        this.rejectParams = params;
        this.catch(params);
     })   
    }


    then(callback){
        callback(params);
    }

    catch(callback){
        callback(params);
    }
}



const promise = new PromiseCustom((resolve, reject) => {
    console.log(resolve);
});

// console.log("Start");
// promise.resolve();
// console.log("End");
// promise.reject();





const p1 = new Promise((resolve, reject) => {
    
});