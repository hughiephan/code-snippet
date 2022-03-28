const axios = require('axios');
const option = require('./option');

// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD
// async function getDataPrice(fsym, tsyms) {
const getDataPrice = async (fsym, tsyms) => {
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
      console.log("A", response.data);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}


module.exports = {
    getDataPrice,
}