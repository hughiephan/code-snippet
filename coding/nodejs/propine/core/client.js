const axios = require('axios');
const option = require('./option');

/**
 * Call to CRYPTO API to get the data price of a token
 * @param fsym   Symbol of the Crypto Token (BTC, ETH,..)
 * @param tsyms  Symbol that we want to convert the Crypto Token's Price to (USD,...)
 * @return       Price
 */
const getDataPrice = async (fsym, tsyms) => {
    try {
      let res = await axios({
            method: 'get',
            url: '/data/price',
            params: {
                fsym,
                tsyms,
                api_key: option.crypto_api_key,
            },
            baseURL: option.crypto_api_url,
        })
       return res.data[tsyms]
   }
   catch (err) {
       console.error(err);
   }
}

module.exports = {
    getDataPrice,
}