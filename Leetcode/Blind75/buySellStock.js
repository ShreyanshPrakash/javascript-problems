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

    profit = Math.max(profit, prices[i] - buyPrice);
    // So, Ideally, I will always assume that my buy price is not today but was in past
    // and. my current price will be higher than the buy price so that I can make the profit
    // Hence prices[i] (current price) - buyPrice (bought in past)
    // So for every teration, calculate the diff between the buyPrice and current price
    // and swap the value only if the diff or the profit was more than the previous profit
  }

  return profit;
};
