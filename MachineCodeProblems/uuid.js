const uuid = (length = 16, groupSize = 4) => {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = lowerCaseChars.toUpperCase();
  const numbers = "0123456789";

  const combinedChars = `${lowerCaseChars}${upperCaseChars}${numbers}`;
  const combinedCharsLength = combinedChars.length;

  let finalResult = "";

  for (let i = 1; i <= length; i++) {
    const randomNumber = Math.floor(Math.random() * combinedCharsLength);
    const randomChar = combinedChars[randomNumber] || "";

    finalResult += randomChar;

    // Added to create group sets with - .... :-)
    if (i % groupSize == 0) {
      finalResult += "-";
    }
  }

  return finalResult;
};

const result = uuid();

console.log(result);
