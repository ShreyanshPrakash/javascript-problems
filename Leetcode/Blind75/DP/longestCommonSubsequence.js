/*

Given two strings text1 and text2, return the length of their longest common subsequence. 
If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters 
(can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.


CONCEPTS :

- Hash

- So for the second text (smaller) create a map with character frequency
- Then iterate over the firstText and keep decreasing the char frquency on match
- Also keep a matchCounter

*/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  let store = new Map();

  for (let char of text2) {
    store.set(char, store.get(char) ? store.get(char) + 1 : 1);
  }

  let matchCount = 0;
  for (let char of text1) {
    if (store.has(char) && store.get(char) > 0) {
      matchCount++;
      const newFreq = store.get(char) - 1;
      store.set(char, newFreq);
    }
  }

  return matchCount;
};



/*

DP answer :-)

CONCEPTS :

- Create 2D matrix and paths concept...how many ways to arrive to a path...similar to that
- Create a 2d array and fill 0 to all
- m * n array for loop
- i will be on the larger text so m
- j will be on smaller text so n
- start from the 1st index for both
- if the char matches then update the index with diagnal + 1
- if no match then add the prev j and prev i value in the 2d array and update
- ur answer will be on the bottom right of the 2d array


*/



/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// will fails for single char both
var longestCommonSubsequence = function(text1, text2) {
    // Lengths of the input strings
    const length1 = text1.length;
    const length2 = text2.length;

    // Create a 2D array to store the lengths of longest common subsequences
    // for all subproblems, initialized with zero
    const dp = new Array(length1 + 1).fill(0).map(() => new Array(length2 + 1).fill(0));

    // Build the dp array from the bottom up
    for (let i = 1; i <= length1; ++i) {
        for (let j = 1; j <= length2; ++j) {
            // If characters match, take diagonal value and add 1
            if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            // If characters do not match, take the maximum value from 
            // the left (dp[i][j-1]) or above (dp[i-1][j])
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    // The bottom-right cell contains the length of the longest
    // common subsequence of text1 and text2
    return dp[length1][length2];
};