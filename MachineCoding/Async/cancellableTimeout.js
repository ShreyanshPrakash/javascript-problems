function setCancellableTimeout(callback, delay, ...args) {
  const timerId = setTimeout(() => {
    callback.call(this, ...args);
  }, delay);

  return () => {
    clearTimeout(timerId);
  };
}
