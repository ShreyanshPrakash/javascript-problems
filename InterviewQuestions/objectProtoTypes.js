

let user = {
    name: "Shreyansh",
    age: 20,
    count: 10,
}


Object.seal(user); // no add or delete - configurable false for all
// fails silently
user.prop = "New"; // I cant add new property
user.count = 11; // M able to update the values
console.log(user);

Object.freeze(user)
user.prop = "New"; // I cant add new property
user.count = 12; // now M not able to update the values
console.log(user);

Object.preventExtensions(user)
user.prop = "New"; // I cant add new property
user.count = 13; // now M not able to update the values
console.log(user);


/*  
    Create - Will be created before
    Read - Always
    Update - 
        - Add new property
        - Updated existing proprty
    Delete - Delete a property

    Writable - Allow updating the property values
    Configurable - Can delete or add new property
    Enumerable - Allowed in Loops or not

*/