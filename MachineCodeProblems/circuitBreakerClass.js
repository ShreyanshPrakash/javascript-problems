const CircuitBreakerStates = {
  OPENED: "OPENED",
  CLOSED: "CLOSED",
  HALF: "HALF"
}

class CircuitBreaker {
  request = null;
  state = CircuitBreakerStates.CLOSED;
  failureCount = 0;
  failureThreshold = 5; // number of failures to determine when to open the circuit
  resetAfter = 50000;
  timeout = 5000; // declare request failure if the function takes more than 5 seconds

  constructor(request, options) {
    this.request = request;
    this.state = CircuitBreakerStates.CLOSED; // allowing requests to go through by default
    this.failureCount = 0;
    // allow request to go through after the circuit has been opened for resetAfter seconds
    // open the circuit again if failure is observed, close the circuit otherwise
    this.resetAfter = Date.now(); 
    if (options) {
      this.failureThreshold = options.failureThreshold;
      this.timeout = options.timeout;
    }
    else {
      this.failureThreshold = 5; // in ms
      this.timeout = 5000; // in ms
   }
  }

  async fire() {
    if (this.state === CircuitBreakerStates.OPENED) {
      if (this.resetAfter <= Date.now()) {
        this.state = CircuitBreakerStates.HALF;
      } else {
        throw new Error('Circuit is in open state right now. Please try again later.');
      }
    }
    try {
      const response = await axios(this.request);
      if (response.status === 200) return this.success(response.data);
      return this.failure(response.data);
    }
    catch(err) {
      return this.failure(err.message);
    }
  } 

  success(data) {
    this.failureCount = 0
    if (this.state === CircuitBreakerStates.HALF) {
      this.state = CircuitBreakerStates.CLOSED;
    }
    return data;
  }



  failure(data) {
    this.failureCount += 1;
    if (
      this.state === CircuitBreakerStates.HALF ||
      this.failureCount >= this.failureThreshold
    ) {
      this.state = CircuitBreakerStates.OPENED;
      this.resetAfter = Date.now() + this.timeout;
    }
    return data;
  }
}




/*
*/

// const request = axios fetchDataFromExternalVendor();
// // wrap the request within a circuit breaker object
// const circuitBreakerObject = new CircuitBreaker(request, { failureThreshold: 4, timeout: 4000 });
// // fire the request
// circuitBreakerObject.fire()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(some error occurred = ${err.message}`);