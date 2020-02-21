const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculate_EvolCrypto: function(callback, lastAvgVolumes, lastEvolCrypto, lastCandles, parameters, now) {
        new Promise(function (resolve, reject) {
            // LINES TO INSERT IN T_ALGO_EVOL_CRYPTO_EVC
            let values = [];

            // HANDLE PARAMETERS
            var myVariables = {};
            for(let i=0; i<parameters.length; i++){
                myVariables[parameters[i].PMT_NAME] = parameters[i].PMT_VALUE;
            }

            let EVOL_VOLUME_WARNING = myVariables.EVOL_VOLUME_WARNING;
            let EVOL_PRICE_WARNING = myVariables.EVOL_PRICE_WARNING;
            let EVOL_PRICE_ALERT = myVariables.EVOL_PRICE_ALERT;
            let EVOL_VOLUME_ALERT = myVariables.EVOL_VOLUME_ALERT;
            let EVOL_NB_TRADE_WARNING = myVariables.EVOL_NB_TRADE_WARNING;
            let EVOL_NB_TRADE_ALERT = myVariables.EVOL_NB_TRADE_ALERT;

            // PREMIERE DETECTION - losrque T_ALGO_EVOL_CRYPTO_EVC est vide
            if(lastEvolCrypto != null && typeof lastEvolCrypto != 'undefined'){
                for(let i=0; i<lastCandles.length; i++){
                    line = [
                        uuidv1(),
                        now,
                        lastCandles.CAD_SYMBOL,

                    ];
                    values.push(line);
                }
            }else{

            }

            let line = [];
                EVC_SYMBOL
                EVC_EVOL_VOL_STATUS,
                EVC_EVOL_NB_TRADES_STATUS,
                EVC_EVOL_PRICE_STATUS,
                EVC_EVOL_OP_CL_PRICE_STATUS,
                EVC_EVOL_VOL,
                EVC_EVOL_NB_TRADES,
                EVC_EVOL_PRICE,
                EVC_EVOL_OP_CR_PRICE,
                EVC_LAST_INSERT


            resolve(values);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
