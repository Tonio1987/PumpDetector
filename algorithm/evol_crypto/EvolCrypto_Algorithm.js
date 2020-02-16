const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculate_EvolCrypto: function(callback, candles, symbol, prices, param_fw1) {
        new Promise(function (resolve, reject) {

            resolve();
        }).then(function(res){
            callback(null, res, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
