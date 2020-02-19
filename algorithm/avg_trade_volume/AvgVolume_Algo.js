const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculate_AvgVolume: function(callback, symbol, candles, parameters, param_fw1) {
        new Promise(function (resolve, reject) {
            let sum_volume = 0;
            let sum_trades = 0;
            let nbPeriod = parameters[0].PMT_VALUE;
            let res = [];

            for(let i=0; i<candles.length; i++){
                sum_volume = sum_volume + candles[i].CAD_VOLUME;
                sum_trades = sum_trades + candles[i].CAD_NUMBER_OF_TRADES;
            }

            res[0] = sum_volume / nbPeriod;
            res[1] = sum_trades / nbPeriod;

            resolve(res);
        }).then(function(res){
            callback(null, res, symbol, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
