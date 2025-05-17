function tryCatchFinally(callback, ...args) {
  let state = {
    isSuccess: false,
    successResult: null,
    errorMessage: "",
    error: null,
  };

  try {
    const result = callback(...args);
    state.isSuccess = true;
    state.successResult = result;
  } catch (error) {
    state.errorMessage = error.message;
    state.error = error;
  }

  return state;
}

const sampleMethod = (params) => {
  const name = "Shreyansh";
  name = "Hello";
};

const result = tryCatchFinally(sampleMethod);
console.log(result);
