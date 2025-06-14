/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

Input: s = "anagram", t = "nagaram"

Output: true


INSIGHTS :

- U need to track the frequency of the characters also
- Keep decrementing the frequency
- if more char are found and freq is 0 then false
- or, if a char is not found in the map, then false

*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {

    if(s.length !== t.length){
        return false;
    }


  let sStore = new Map();

  for (let char of s) {
    const frequency = (sStore.get(char) || 0) + 1;
    sStore.set(char, frequency);
  }

  for (let char of t) {
    if (!sStore.has(char) || sStore.get(char) === 0) {
      return false;
    }
    sStore.set(char, counter.get(char) - 1);
  }

  return true;
};
