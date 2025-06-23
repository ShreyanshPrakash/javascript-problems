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
    }
    store.set(char, i);
    // + 1 as I added a new character
    maxSubLength = Math.max(maxSubLength, i - start + 1);
  }

  return maxSubLength;
};


const s = "dvdf"