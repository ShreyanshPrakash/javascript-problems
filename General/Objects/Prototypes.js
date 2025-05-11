


const animal = {
    walks: true,
    walk(steps = 10){
        for(let step of Array.from(Array(steps).keys())){
            console.log(step);
        }
    }
}

const rabbit = Object.create(animal);
console.log(rabbit);
rabbit.walk(10);