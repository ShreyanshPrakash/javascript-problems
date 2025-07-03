class MyEventEmitter {
  constructor() {
    this.eventMap = new Map();
  }

  on(eventName, handler) {
    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, [handler]);
      return;
    }

    this.eventMap.set(eventName, [...this.eventMap.get(eventName), handler]);
  }

  emit(eventName, payload) {
    const handlerList = this.getAllEventHandlers(eventName);
    for (let handler of handlerList) {
      handler.call(this, payload);
    }
  }

  offAll(evetName, handlerFn) {
    const handlerList = this.getAllEventHandlers(evetName);
    if (!handlerList.length) {
      return;
    }

    let newHandlers = [];
    for (let handler of handlerList) {
      if (handler !== handlerFn) {
        newHandlers.push(handler);
      }
    }

    this.eventMap.set(evetName, newHandlers);
  }

  off(evetName, handlerFn) {
    const handlerList = this.getAllEventHandlers(evetName);
    if (!handlerList.length) {
      return;
    }

    const index = handlerList.findIndex((handler) => handler === handlerFn);

    if (index < 0) {
      return;
    }

    handlerList.splice(index, 1);

    this.eventMap.set(evetName, handlerList);
  }

  getAllEventHandlers(eventName) {
    return this.eventMap.get(eventName) || [];
  }
}

const eventEmitter = new MyEventEmitter();

const handler = (res) => {
  console.log(res);
};

eventEmitter.on("listen", handler);
eventEmitter.on("listen", handler);
eventEmitter.on("listen", (res) => console.log(res));
eventEmitter.on("listen", (res) => console.log(res));

// eventEmitter.emit("listen", {name: "Shreyansh"});

console.log(eventEmitter.getAllEventHandlers("listen"));

eventEmitter.off("listen", handler);

console.log(eventEmitter.getAllEventHandlers("listen"));
