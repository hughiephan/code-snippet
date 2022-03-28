const csvParser = require("csv-parser");
const client = require("../core/client");
const fs = require('fs');

/**
 * Get all the transactions & calculate their balances
 * @param path        Location of the CSV.
 * @param tokenName   Token we want to filter.
 */
function all(path) {
  const transactions = [];
  fs.createReadStream(path)
  .pipe(csvParser())
  .on("data", (data) => {
    const {amount, timestamp} = data;
    console.log("Processing: ", timestamp);
    data.amount = parseFloat(amount); 
    transactions.push(data);
  })
  .on("end", async () => {
    calculatePortfolio(transactions, "USD");
  });
}

/**
 * Get the transactions with the given Token Name & calculate their balances
 * @param path        Location of the CSV.
 * @param tokenName   Token we want to filter.
 */
function byToken(path, tokenName) {
  const transactions = [];
  fs.createReadStream(path)
  .pipe(csvParser())
  .on("data", (data) => {
    const {amount, timestamp, token} = data;
    console.log("Processing: ", timestamp);
    data.amount = parseFloat(amount);
    if (token = tokenName) transactions.push(data); 
  })
  .on("end", () => {
    calculatePortfolio(transactions, "USD");
  });
}

/**
 * Get the transactions in the given Date & calculate their balances
 * @param path          Location of the CSV.
 * @param choosenDate   Date we want to filter. Format should by YYYY-MM-DD
 */
function byDate(path, choosenDate) {
  const transactions = [];
  fs.createReadStream(path)
  .pipe(csvParser())
  .on("data", (data) => {
    const {amount, timestamp} = data;
    data.amount = parseFloat(amount);
    if (isInChoosenDate(timestamp, choosenDate)) transactions.push(data); 
  })
  .on("end", () => {
    calculatePortfolio(transactions, "USD");
  });
}

/**
 * Calculate the token balances from transactions. 
 * - If type = 'DEPOSIT', add the amount for that token.
 * - If type = 'WITHDRAWAL', substrat the amount for that token.
 * @param transactions  Array of transactions.
 * @return              Token with it's balance calculated
 */
function caclculateTokenBalance (transactions) {
  const tokenBalance = Array.from(transactions.reduce((m, { token, amount, transaction_type }) => {
      if (transaction_type === 'DEPOSIT')
          return m.set(token, (m.get(token) || 0) + amount)
      else if (transaction_type === 'WITHDRAWAL')
          return m.set(token, (m.get(token) || 0) - amount)
  }, new Map), ([token, amount]) => ({ token, amount }));
  return tokenBalance;
};

/**
 * Check if the current timestamp of the transaction is in the choosenDate
 * @param timestamp  a transaction's timestamp
 * @return           (boolean)
 */
function isInChoosenDate(timestamp, choosenDate){
  date = choosenDate.split("-");
  const startOfDate = Math.round(Date.parse(new Date(Date.UTC(date[0], date[1] - 1, date[2], 0, 0, 0))) / 1000);
  const endOfDate = Math.round(Date.parse(new Date(Date.UTC(date[0], date[1] - 1, date[2], 23, 59, 59))) / 1000);
  if (timestamp >= startOfDate && timestamp <= endOfDate) {
    console.log("Processing: ".concat(timestamp, " transaction is valid ", choosenDate, "(",startOfDate, ",", endOfDate, ")"));
    return true;
  } 
  console.log("Processing: ".concat(timestamp, " transaction is not in the given date ", choosenDate, "(",startOfDate, ",", endOfDate, ")"));
  return false;
};

/**
 * Calculate the portfolio for each tokens
 * (portfolio = total token amount * current price)
 * @param transactions  Array of transactions.
 */
function calculatePortfolio(transactions, fsym){
  const tokenBalance = caclculateTokenBalance(transactions);
  tokenBalance.forEach(async function(e){
    const price = await client.getDataPrice(e.token, fsym);
    console.log("Portfolio for " + e.token + ". Total Balance: " + (price.USD * e.amount) + fsym);
  });
}

module.exports = {
  all,
  byToken,
  byDate,
}