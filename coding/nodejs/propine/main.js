const vorpal = require('vorpal')();
const portfolio = require("./core/portfolio");
const validator = require("./core/validator");
const option = require("./core/option");
const msg = require("./core/msg");

// Question 1
// Given no parameters, return the latest portfolio value per token in USD
vorpal
  .command('all', 'Calculate all portfolio balance')
  .action(function(_, callback) {
    portfolio.all(option.path);
    callback();
  });

// Question 2
// Given a token, return the latest portfolio value for that token in USD
vorpal
  .command('byToken [token]', 'Calculate all portfolio balance by Token')
  .validate(function (args) {
    if (validator.isTokenSupported(args.token)) {
      return true;
    } else {
      return msg.TOKEN_NOT_SUPPORTED.concat(". ", "Supported type are: ", option.supportTokenType);
    }
  })
  .action(function(args, callback) {
    portfolio.byToken(option.path, args.token);
    callback();
  });

// Question 3
// Given a date, return the portfolio value per token in USD on that date
vorpal
  .command('byDate [date]', 'Calculate all portfolio balance in a Date')
  .action(function(args, callback) {
    portfolio.byDate(option.path, args.date);
    callback();
  });

vorpal
  .delimiter('propine-cli$')
  .show();