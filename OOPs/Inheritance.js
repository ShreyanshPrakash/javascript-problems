class Shape {
  constructor(width, height, depth) {
    this.width = width || 0;
    this.height = height || 0;
    this.depth = depth || 0;
  }

  get area() {
    return this.width * this.height;
  }

  get volume() {
    return this.area * this.depth;
  }
}


class Rectangle extends Shape{
    constructor(width, height){
        super(width, height);
    }

    getLines(){
        return 4;
    }
}

class Square extends Rectangle {
  constructor(width, height) {
    super(width, height);
  }
}

const sq = new Square(10, 20);
console.log(sq.area);
console.log(sq.getLines())
