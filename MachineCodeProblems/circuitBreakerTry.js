const CIRCUIT_BREAKER_STATES = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  HALF_OPEN: "HALF_OPEN",
};

const DEFAULTS = {
  PAUSE_DURATION: 8 * 1000,
  FAILURE_THRESHOLD: 3,
};

class CircuitBreaker {
  constructor(request, options) {
    this.request = request;
    this.status = CIRCUIT_BREAKER_STATES.CLOSED;
    this.pauseDuration = DEFAULTS.PAUSE_DURATION;
    this.failureThreshold = DEFAULTS.FAILURE_THRESHOLD;

    this.failedCount = 0;
    this.isPaused = false;

    if (options) {
      this.pauseDuration = options.pauseDuration;
      this.failureThreshold = options.failureThreshold;
    }
  }

  async fire() {
    if (this.status === CIRCUIT_BREAKER_STATES.OPEN) {
      if (this.isPaused) {
        throw new Error("Circuit is open right now. Try again later");
      } else {
        this.status = CIRCUIT_BREAKER_STATES.HALF_OPEN;
      }
    }

    try {
      const result = await this.request.catch((error) => {
        throw new Error("error : -> " + error);
      });
      this.#handleSuccess();
      return result;
    } catch (error) {
      this.#handleFailure();
      return error;
    }
  }

  #handleSuccess() {
    this.failedCount = 0;
    if (this.status === CIRCUIT_BREAKER_STATES.HALF_OPEN) {
      this.status = CIRCUIT_BREAKER_STATES.CLOSED;
    }
  }

  #handleFailure() {
    this.failedCount++;
    if (
      this.status === CIRCUIT_BREAKER_STATES.HALF_OPEN ||
      this.failedCount >= this.failureThreshold
    ) {
      this.status = CIRCUIT_BREAKER_STATES.OPEN;
      if (!this.isPaused) {
        this.isPaused = true;
        setTimeout(() => {
          this.isPaused = false;
        }, this.pauseDuration);
      }
    }
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => reject("Error"), 2 * 1000);
});

const circuitBreaker = new CircuitBreaker(promise);

circuitBreaker
  .fire(10)
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
circuitBreaker
  .fire(10)
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
circuitBreaker
  .fire(10)
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
circuitBreaker
  .fire(10)
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

  
setTimeout(() => {
  circuitBreaker
    .fire(10)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  circuitBreaker
    .fire(10)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  circuitBreaker
    .fire(10)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  circuitBreaker
    .fire(10)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}, 5 * 1000);
