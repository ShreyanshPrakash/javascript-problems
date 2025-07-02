



function calculate(){

    let sum = 0;

    this.add = function(value){
        sum += value;
        return this;
    }

    this.sub = function(value){
        sum -= value;
        return this;
    }

    this.value = function(){
        return sum;
    }

    return this;
}


console.log(
    calculate()
    .add(2)
    .add(3)
    .sub(1)
    .value()
)