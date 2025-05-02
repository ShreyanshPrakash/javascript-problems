



const user = {
    name: "Shreyansh Prakash",
    age: 20,
    getName: function(){
        const name = this.name;
        console.log(name);
        return name;
    }
}

user.getName(); // "Shreyansh Prakash"

const getNameRef = user.getName; // only reference to the object is passed
getNameRef(); // the getName method is not called on the user object, but on global, hence this will get mapped to global object




