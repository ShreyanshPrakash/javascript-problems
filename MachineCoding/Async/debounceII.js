function debounce(callback, wait = 0) {
  let timerId = null;
  let context = thisl;
  let lastArgs = undefined;

  function init(...args) {
    cancel();
    context = this;
    lastArgs = args;
    timerId = setTimeout(() => {
      flush();
    }, wait);
  }

  function cancel() {
    clearTimeout(timerId);
    timerId = null;
  }

  function flush() {
    if (timerId) {
      cancel();
      callback.call(context, ...lastArgs);
    }
  }

  init.cancel = cancel;
  init.flush = flush;

  return init;
}
