function setCancellableInterval(callback, delay, ...args) {
  let timerId = null;
  timerId = setInterval(() => {
    callback.call(this, ...args);
  }, delay);

  return () => {
    clearInterval(timerId);
  };
}
