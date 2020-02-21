const Binance = require('binance-api-node').default;

// Authenticated client, can make signed calls
const client = Binance({
    apiKey: process.env.BINANCE_KEY,
    apiSecret: process.env.BINANCE_SECRET
});

module.exports = {
    binance_Candles: function(callback, symbol, interval, param_fw1) {
        return new Promise(async function (resolve, reject) {

            let result = await client.candles({ symbol: symbol, interval: interval, limit: 1});
            resolve(result);
        }).then(function(data){
            callback(null, data, symbol, param_fw1);
        }).catch(function(err) {
            callback(err, null, symbol, param_fw1);
        });
    }
};
