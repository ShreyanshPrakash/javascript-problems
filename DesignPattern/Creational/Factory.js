class Engineer {
  constructor() {}
}

class Doctor {
  constructor() {}
}

class Artist {
  constructor() {}
}

class Pilot {
  constructor() {}
}

class Student {
  static create(type, ...params) {
    switch (type) {
      case "engineer":
        return new Engineer(...params);
      case "doctor":
        return new Doctor(...params);
      case "artist":
        return new Artist(...params);
      case "pilot":
        return new Pilot(...params);
      default:
        throw new Error("Invalid type");
    }
  }

  constructor() {}
}

const doctor = Student.create("doctor", 29);
console.log(doctor);
