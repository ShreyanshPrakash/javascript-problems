function checkIsArray(arg) {
  const isArray = Object.prototype.toString.call(arg) === "[object Array]";
  return isArray;
}
