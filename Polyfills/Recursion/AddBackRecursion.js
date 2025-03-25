const SAMPLE_DATA = [
  {
    label: "one",
    level: 0,
  },
  {
    label: "two",
    level: 0,
    children: [
      {
        label: "two-one",
        level: 1,
      },
      {
        label: "two-two",
        level: 1,
      },
    ],
  },
  {
    label: "three",
    level: 0,
    children: [
      {
        label: "three-one",
        level: 1,
      },
      {
        label: "three-two",
        level: 1,
      },
    ],
  },
];

const logLabelRecursively = (data = []) => {
  let map = {};

  let combinedLabel = "";

  for (let item of data) {
    const { label, level, children = [] } = item;

    combinedLabel = combinedLabel + "." + label;
    if (children.length) {
      const result = logLabelRecursively(children);
    //   combinedLabel = combinedLabel + "." + result.combinedLabel;
      combinedLabel = label + "." + result.combinedLabel;
    }
    map[combinedLabel] = 0;
  }

  return { combinedLabel, map };
};

const result = logLabelRecursively(SAMPLE_DATA);

console.log(result);

