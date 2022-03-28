require('dotenv').config();

module.exports = {
    csv_path: process.env.PROPINE_CSV_PATH || './storage/test.csv',
    supportTokenType: process.env.PROPINE_SUPPORT_TOKEN_TYPE || ['BTC', 'ETH', 'XRP'],
    crypto_api_key: process.env.PROPINE_CRYPTO_API_KEY || '00fc3a63e2a98d72edf96b22aeff0906be51d9fd5a2031dc9cca555dfa538167',
    crypto_api_url: process.env.PROPINE_CRYPTO_API_URL || 'https://min-api.cryptocompare.com',
};
