/*

    Let's implement our own version of Promise.all(), a promiseAll function, 
    with the difference being the function takes in an array instead of an iterable. 
    Be sure to read the description carefully and implement accordingly!

*/

function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    let result = new Array(iterable.length);
    let pending = iterable.length;

    if (pending === 0) {
      resolve(result);
      return;
    }

    iterable.forEach(async (item, index) => {
      try {
        const res = await item;
        result[index] = res;
        pending--;

        if (pending === 0) {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Resolved example.
const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

const result = await promiseAll([p0, p1, p2]); // [3, 42, 'foo']
console.log(result);
