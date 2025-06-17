/*
    You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

*/

const maxProfit = (prices) => {
  let buyPrice = prices[0];
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    // on ith day, I found that my buyPrice (past I bought) was higher than today's price
    // So I would make a loss.
    // Hence, I found a day where I can buy a stock at a cheaper value,
    // So update the buyPrice to current day price
    if (prices[i] < buyPrice) {
      buyPrice = prices[i];
    }
    // Whenever, the above if is true, it will update the buPrice to the current index value
    // at tthat time prices[i] is same as byPrice...hence the diff will always be 0
    // NO need to do the below work.
    // It will be needed though when we consider the negative values
    profit = Math.max(profit, prices[i] - buyPrice);
    // So, Ideally, I will always assume that my buy price is not today but was in past
    // and. my current price will be higher than the buy price so that I can make the profit
    // Hence prices[i] (current price) - buyPrice (bought in past)
    // So for every teration, calculate the diff between the buyPrice and current price
    // and swap the value only if the diff or the profit was more than the previous profit
  }

  return profit;
};

/*

*/

var maxProfitTwoPointer = function (prices) {
  // if(prices.length < 1){
  //     return 0;
  // }

  let start = 0;
  let end = 1;
  let profit = 0;

  let values = [];

  while (start <= end && end <= prices.length - 1) {
    if (prices[start] > prices[end]) {
      start = end;
    } else {
      // only if u want the values for which u had the max profit
      if(prices[end] - prices[start] > profit){
        values = [prices[start], prices[end]];
      }
      // U only need to calcualte the new profit when the start and end are not pointing to the same index
      profit = Math.max(profit, prices[end] - prices[start]);
      
    }

    end++;
  }
  console.log(values);
  return profit;
};


// const prices = [7, 6, 10, 11, 5, 5];
const prices = [-10, -2, 10, 11, 5, 5];
console.log(maxProfitTwoPointer(prices))