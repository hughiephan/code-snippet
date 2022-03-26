const vorpal = require('vorpal')();
const portfolio = require("./core/portfolio");
const path = './csv/transactions.csv'

vorpal
  .command('all', 'Calculate all portfolio balance')
  .action(function(args, callback) {
    portfolio.all(path);
    callback();
  });

vorpal
  .delimiter('propine-cli$')
  .show();