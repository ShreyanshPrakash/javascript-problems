const backTrackFunction = (list) => {
  const len = list.length;
  let result = [];
  let solutions = [];

  const backTrack = (i) => {
    if (i === len) {
      result.push([...solutions]);
      return;
    }

    // Dont Pick A Solution
    // Dont pick this i in the solution
    backTrack(i + 1);

    // Pick a Solution
    // Consider this i on the solution
    solutions.push(list[i]); // This is where u picked
    backTrack(i + 1);
    solutions.pop(); // Here u r again rmeoving i from the solution
  };

  backTrack(0);
  return result;
};

const list = [1, 2, 3];
console.log(backTrackFunction(list));
