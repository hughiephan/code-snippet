const vorpal = require('vorpal')();
const portfolio = require("./portfolio/portfolio");
const validator = require("./core/validator");
const option = require("./core/option");
const msg = require("./core/msg");

// Question 1.1
// Given no parameters, return the latest portfolio value per token in USD
vorpal
  .command('all', msg.CALCULATE_PORTFOLIO_ALL)
  .action(async function(_, callback) {
    portfolio.all(option.csv_path);
    callback();
  });

// Question 1.2
// Given a token, return the latest portfolio value for that token in USD
vorpal
  .command('byToken [token]', msg.CALCULATE_PORTFOLIO_BY_TOKEN.concat(msg.SUPPORTED_TYPE_ARE))
  .validate(function (args) {
    if (validator.isTokenSupported(args.token)) {
      return true;
    } else {
      return msg.TOKEN_NOT_SUPPORTED.concat(msg.SUPPORTED_TYPE_ARE);
    }
  })
  .action(function(args, callback) {
    portfolio.byToken(option.csv_path, args.token);
    callback();
  });

// Question 1.3
// Given a date, return the portfolio value per token in USD on that date
vorpal
  .command('byDate [date]', msg.CALCULATE_PORTFOLIO_BY_DATE)
  .action(function(args, callback) {
    portfolio.byDate(option.csv_path, args.date);
    callback();
  });

vorpal
  .delimiter('propine-cli$')
  .show();