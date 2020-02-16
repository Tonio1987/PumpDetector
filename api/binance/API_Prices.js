const Binance = require('binance-api-node').default

// Authenticated client, can make signed calls
const client = Binance({
    apiKey: process.env.BINANCE_KEY,
    apiSecret: process.env.BINANCE_SECRET
});

module.exports = {
    binance_Prices: function(callback) {
        return new Promise(async function (resolve, reject) {
            let result = await client.prices();
            resolve(result);
        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
