/*

Let's implement our own version of Promise.allSettled(), 
a promiseAllSettled function, with the difference being the function takes in an array instead of an iterable. 
Be sure to read the description carefully and implement accordingly!

*/

function promiseAllSettled(iterables) {
  return new Promise((resolve, reject) => {
    let result = new Array(iterables.length);
    let pending = iterables.length;

    if (pending === 0) {
      resolve(result);
      return;
    }

    iterables.forEach(async (item, index) => {
      try {
        const res = await item;
        result[index] = res;
      } catch (error) {
        result[index] = error;
      } finally {
        pending--;
        if (pending === 0) {
          resolve(result);
        }
      }
    });
  });
}




const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('foo');
  }, 100);
});

const result = await promiseAllSettled([p0, p1, p2]);
console.log(result);