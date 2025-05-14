const handler = () => {
  const name = "Shreyansh";
  return name;
};

const promisify = (callback) => {
  const promise = new Promise((resolve, reject) => {
    resolve(callback());
  });

  return promise;
};

const result = promisify(handler);

result
  .then((res) => console.log("res : ", res))
  .catch((error) => console.log(error));
