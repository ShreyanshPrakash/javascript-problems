function promiseAll(iterables) {
  return new Promise((resolve, reject) => {
    let final = new Array(iterables.length);
    let unResolvedCount = iterables.length;

    if (unResolvedCount === 0) {
      resolve(result);
      return;
    }

    iterables.forEach(async (item, index) => {
      try {
        const result = await item;
        final[index] = result;
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
