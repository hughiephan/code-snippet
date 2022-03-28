require('dotenv').config();

module.exports = {
    csv_path: process.env.PROPINE_CSV_PATH || './storage/transactions.csv',
    supportTokenType: process.env.PROPINE_SUPPORT_TOKEN_TYPE || ['BTC', 'ETH', 'XRP'],
};
