const axios = require('axios');
const option = require('./option');

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
       if(res.status == 200){
           console.log("[getDataPrice] Current price for ".concat(fsym, " is ", res.data[tsyms], tsyms))
       }    
       return res.data
   }
   catch (err) {
       console.error(err);
   }
}

module.exports = {
    getDataPrice,
}