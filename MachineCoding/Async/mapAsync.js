function mapAsync(iterables, callback) {
  return async function () {
    let final = [];

    for (let item of iterables) {
      try {
        const result = await callback.call(this, item);
        final.push(result);
      } catch (error) {
        final.push(result);
      }
    }

    return final;
  };
}
