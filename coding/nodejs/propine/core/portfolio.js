const csvParser = require("csv-parser");
const fs = require('fs');

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
  .on("end", () => {
    console.log(getTokenBalance(transactions));
  });
}

// Only get the transactions with the given Token Name
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
    console.log(getTokenBalance(transactions));
  });
}

// Only get the transactions in the given Date
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
    console.log(transactions);
    console.log(getTokenBalance(transactions));
  });
}

//
// Private function
//
function getTokenBalance (transactions) {
  const res = Array.from(transactions.reduce((m, { token, amount, transaction_type }) => {
      if (transaction_type === 'DEPOSIT')
          return m.set(token, (m.get(token) || 0) + amount)
      else if (transaction_type === 'WITHDRAWAL')
          return m.set(token, (m.get(token) || 0) - amount)
  }, new Map), ([token, amount]) => ({ token, amount }));
  return res;
};

// Format is YYYY-MM-DD
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

module.exports = {
  all,
  byToken,
  byDate,
}