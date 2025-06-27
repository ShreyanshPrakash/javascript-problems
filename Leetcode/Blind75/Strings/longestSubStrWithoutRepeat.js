/*
Given a string s, find the length of the longest substring without duplicate characters.

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let store = new Map();
  let start = 0;

  let maxSubLength = 0;

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (store.has(char)) {
      // just wanna get ahead of the previous found location
      // Given "dvdf", since the last time d was at i = 0
      // start will shift to 0 + 1, as 0 would be saved in the map
      start = Math.max(start, store.get(char) + 1);
      // Also, we might find multiple duplicated of multiple characters
      // eg : abba
      // hence it might be the case that u got the duplicate b...
      // so u shifted start to new value
      // now u got duplicate a... the last appearance of a was 0 which is less than start now
      // we cannot go back to that value....
      // Hence, its important to do the Math.max of start and the prpevious appearence + 1


    }
    store.set(char, i);
    // + 1 as I added a new character
    maxSubLength = Math.max(maxSubLength, i - start + 1);
  }

  return maxSubLength;
};


const s = "dvdf"