/*
Poly means Many, morphism means Forms.
In polymorphism the same method results in different actions depending on the object it is acting upon.
In programming terms, the remote control calls the power method, and each device has its own implementation of what happens when the power method is called.
This is polymorphism: the same method (power) results in different actions depending on the object it is acting upon (TV, DVD player, or radio).
*/

// Base class
class Device {
  power() {
    throw new Error("power method must be implemented");
  }
}

// Derived class for TV
class TV extends Device {
  power() {
    console.log("Turning TV on or off.");
  }
}

// Derived class for DVD Player
class DVDPlayer extends Device {
  power() {
    console.log("Turning DVD Player on or off.");
  }
}

// Derived class for Radio
class Radio extends Device {
  power() {
    console.log("Turning Radio on or off.");
  }
}

// Function that demonstrates polymorphism
function useRemoteControl(device) {
  device.power();
}

// Usage
const myTV = new TV();
const myDVDPlayer = new DVDPlayer();
const myRadio = new Radio();

useRemoteControl(myTV); // Output: Turning TV on or off.
useRemoteControl(myDVDPlayer); // Output: Turning DVD Player on or off.
useRemoteControl(myRadio); // Output: Turning Radio on or off.
