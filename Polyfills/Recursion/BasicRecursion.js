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
];

const logLabelRecursively = (data = []) => {
  for (let item of data) {
    const { label, level, children = [] } = item;
    console.log(label, level);
    if (children.length) {
      logLabelRecursively(children);
    }
  }
};

logLabelRecursively(SAMPLE_DATA);
