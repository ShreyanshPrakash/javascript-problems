


const recursivePrintString = (str) => {
    if(str.length === 1){
        return str;
    }
    str = str.slice(0, str.length - 1);
    console.log(str);
    return recursivePrintString(str);

}



const str = "2-1-1";
console.log(recursivePrintString(str));