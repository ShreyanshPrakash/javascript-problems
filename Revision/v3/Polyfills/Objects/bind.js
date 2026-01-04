

function myBind(obj, ...args){


    obj.funcToCall = this;


    return function(...moreArgs){
        const totalArgs = [...args, ...moreArgs];
        return obj.funcToCall(totalArgs);
    }

}