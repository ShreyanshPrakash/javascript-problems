function myPromiseAll(iterables) {
  return new Promise((resolve, reject) => {
    let result = new Array(iterables.length);
    let unResolvedCount = iterables.length;

    if (unResolvedCount === 0) {
      resolve(result);
      return;
    }

    iterables.forEach(async (item, index) => {
      try {
        const value = await item;
        result[index] = value; // index in very inportant
        // every promise will be fired at once but might take variable duration
        // hence 3rd promise might resolve before the 1st
        unResolvedCount--;

        if (unResolvedCount === 0) {
          resolve(result);
          return;
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}
