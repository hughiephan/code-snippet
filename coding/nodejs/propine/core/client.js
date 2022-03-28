const axios = require('axios');
const option = require('./option');

// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD
function getTokenPrice(fsym, tsyms) {
    axios({
        method: 'get',
        url: '/data/price',
        params: {
            fsym,
            tsyms,
            api_key: option.crypto_api_key,
        },
        baseURL: option.crypto_api_url,
    })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}


module.exports = {
    getTokenPrice,
}