class EventEmitter2 {
  constructor() {
    this.handlerMap = new Map();
  }

  on(eventName, handler) {
    if (!this.handlerMap.has(eventName)) {
      this.handlerMap.set(eventName, []);
    }

    this.handlerMap.set(eventName, [
      ...this.handlerMap.get(eventName),
      handler,
    ]);
  }

  off(eventName, handler) {
    let handlers = this.handlerMap.get(eventName);
    let newHandlers = handlers.filter((handlerfn) => handlerfn !== handler);
    this.handlerMap.set(eventName, newHandlers);
  }

  emit(eventName, payload) {
    let handlers = this.handlerMap.get(eventName) || [];
    for (let handler of handlers) {
      handler.call(this, payload);
    }
  }
}

const eventEmitter = new EventEmitter2();

eventEmitter.on("listen", (res) => console.log("One : ", res));
eventEmitter.on("listen", (res) => console.log("Two : ", res));

eventEmitter.emit("listen", 10);
