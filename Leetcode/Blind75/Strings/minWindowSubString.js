/*

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that 
every character in t (including duplicates) is included in the window. 
If there is no such substring, return the empty string "".


CONCEPTS : 

- Sliding Window - Hard
- Create two pointers start and end
- Same thing as maxProductSubArray

- first create a map of all the characters and their frequency for "t" string
- run the while loop till start <= end (as usual sliding window) and end is less than the s.length
- 

*/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

// This solution passes all leetcode tests although might be not completely correct
// expecially if un consider that the same char can be there multiple times in the t
// hence in the algo, u need to keep looking for all the frequency
var minWindow = function (s, t) {
  let store = new Map();
  let storeCopy = new Map();
  let result = "";
  let subString = "";

  let start = 0;
  let end = 0;

  let windowCount = t.length;

  for (let char of t) {
    const frquency = store.get(char) || 1;
    store.set(char, frquency + 1);
    storeCopy.set(char, frquency);
  }

  while (start <= end && end < s.length) {
    const char = s[end];

    if (!subString) {
      if (storeCopy.has(char)) {
        subString += char;
      }
    } else {
      subString += char;
    }

    if (storeCopy.has(char) && storeCopy.get(char) > 0) {
      storeCopy.set(char, storeCopy.get(char) - 1);
      windowCount--;
    }

    if (windowCount <= 0) {
      storeCopy = structuredClone(store);
      start = end + 1;
      windowCount = t.length;

      if (!result) {
        result = subString;
      } else {
        if (result.length > subString.length) {
          result = subString;
        }
      }

      subString = "";
    }

    end++;
  }

  if (
    result.length > subString.length &&
    subString !== "" &&
    windowCount === 0
  ) {
    result = subString;
  }

  return result;
};

// Same as above but with comments inline
var minWindowComments = function (s, t) {
  let store = new Map();
  let result = "";
  let subString = "";

  let start = 0;
  let end = 0;

  let windowCount = t.length;

  for (let char of t) {
    const frquency = store.get(char) || 1;
    store.set(char, frquency + 1);
  }

  while (start <= end && end < s.length) {
    const char = s[end];

    if (!subString) {
      // if subString is empty then add only if the char is found.
      // Such that the substring starts with and ends with the chars present in the t string
      if (storeCopy.has(char)) {
        subString += char;
      }
    } else {
      // if non empty that means, the subString is already there and started with char in t string
      subString += char;
    }

    // if (store.has(char)) {
    //   // if char is found, reduce the windowCount.
    //   // Better would be if u could match against the char level frequency...anyway we are preserving it in map
    //   windowCount--;
    // }

    // if char is found and it still has the frequency left
    if (storeCopy.has(char) && storeCopy.get(char) > 0) {
      storeCopy.set(char, storeCopy.get(char) - 1); // reduce the frequency of the char
      windowCount--; // if char is found, reduce the windowCount.
    }

    if (windowCount <= 0) {
      // all the chars in t has been found in the subString
      start = end + 1; // Move up the start index
      windowCount = t.length; // reset the windowCount since the 's' string might still have more chars
      storeCopy = structuredClone(store); // reset the store copy to get the initial char frequencies

      if (!result) {
        // if result is empty then directly update
        result = subString;
      } else {
        // update only if the new subString length is lesser than the result length
        if (result.length > subString.length) {
          result = subString;
        }
      }

      subString = ""; // reset the subString
    }

    end++;
  }

  if (
    result.length > subString.length &&
    subString !== "" && // substring stil might not be empty...since it added and reset trigger didnt come
    windowCount === 0 // if all the chars in t is found again
  ) {
    result = subString;
  }

  return result;
};

/*
    s = ""
*/

const s = "ADOBECODEBANC";
const t = "AABC";

const result = minWindow(s, t);
console.log(result);
