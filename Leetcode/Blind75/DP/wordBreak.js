/*

Given a string s and a dictionary of strings wordDict, return true if s can be 
segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

CONCEPTS :

- Its a 2Sum problem with a twist

- Since its a word dictionary, there should not be any duplicate
- Else, u need to work for that as well

*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// Since its a word dictionary, there should not be any duplicate
var wordBreak2 = function (s, wordDict) {
  // 2Sum problem

  let store = new Map();

  for (let word of wordDict) {
    if (store.has(word)) {
      return true;
    }

    if (s.includes(word)) {
      // replace all the occurance of the word from the s string
      // if something still remains, that means I need to find the word
      // so add the remain to the map
      let remain = s.replaceAll(word, "");
      if (remain) {
        store.set(remain, word);
      }
    }
  }

  return false;
};

// :-)
// There might be edge cases where this would fail ?
// I am keep removing the words from the s string itself till it becomes empty
// if not empty then false
var wordBreak = function (s, wordDict) {
  for (let word of wordDict) {
    if (!s) {
      return true;
    }

    if (s.includes(word)) {
      s = s.replaceAll(word, "");
    }
  }

  return false;
};

const string = "applepenapple";
const wordDict = ["apple", "pen", "apple"];

// const string = "catsandog";
// const wordDict = ["cats","dog","sand","and","cat"];

const result = wordBreak(string, wordDict);
console.log(result);
