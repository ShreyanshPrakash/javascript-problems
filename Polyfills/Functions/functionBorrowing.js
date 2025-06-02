
const user = {
    name: "Shreyansh",
    getName: function(){
        return this.name;
    }
}

const person = {
    name: "John",
}


const name = user.getName();
console.log(name);

const personName = user.getName.call(person);
console.log(personName);
