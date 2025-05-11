

const customBind = (context, ...args) => {

    
    function returnMethod(){
        console.log(context);
        console.log(this);
    }

    return returnMethod;
    

}


Function.prototype.bind = customBind;

const user = {
    name: "Shreyansh Prakash",
    age: 20,
    getName: function(){
        const name = this.name;
        console.log(name);
        return name;
    }
}

const bindUser = user.getName.bind(user);
bindUser();