


const controller = new AbortController();

let signal = controller.signal;


signal.addEventListener("abort", (event) => console.log(event));


controller.abort();