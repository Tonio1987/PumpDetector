const moment = require('moment');
moment.locale('fr');
const uuidv1 = require('uuid/v1');

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

            let PMT_EVOL_VOLUME_WARNING = myVariables.EVOL_VOLUME_WARNING;
            let PMT_EVOL_VOLUME_ALERT = myVariables.EVOL_VOLUME_ALERT;
            let PMT_EVOL_PRICE_WARNING = myVariables.EVOL_PRICE_WARNING;
            let PMT_EVOL_PRICE_ALERT = myVariables.EVOL_PRICE_ALERT;
            let PMT_EVOL_NB_TRADE_WARNING = myVariables.EVOL_NB_TRADE_WARNING;
            let PMT_EVOL_NB_TRADE_ALERT = myVariables.EVOL_NB_TRADE_ALERT;

            var EVOL_VOLUME_ON_PERIOD = 0;
            var EVOL_PRICE_ON_PERIOD = 0;
            var EVOL_NB_TRADES_ON_PERIOD = 0;

            var EVOL_PRICE_SINCE_WARNING = 0;

            var CANDLE_PRICE_SINCE_WARNING = 0;

            var EVOL_VOLUME_ON_PERIOD_STATUS = 'R-A-S';
            var EVOL_PRICE_ON_PERIOD_STATUS = 'R-A-S';
            var EVOL_NB_TRADES_ON_PERIOD_STATUS = 'R-A-S';

            // PREMIERE DETECTION - losrque T_ALGO_EVOL_CRYPTO_EVC est vide
            if(lastEvolCrypto != null && typeof lastEvolCrypto != 'undefined'){
                for(let i=0; i<lastCandles.length; i++){
                    for(let j=0;j<lastAvgVolumes.length; j++){
                        if(lastCandles[i].CAD_SYMBOL === lastAvgVolumes[j].AVT_SYMBOL){

                            CANDLE_PRICE_SINCE_WARNING = lastCandles[i].CAD_OPEN_PRICE;
                            EVOL_PRICE_ON_PERIOD = ((lastCandles[i].CAD_CLOSE_PRICE - lastCandles[i].CAD_OPEN_PRICE) / lastCandles[i].CAD_OPEN_PRICE)*100;

                            if(lastAvgVolumes[j].AVT_AVG_VOLUME_TRADE > 0){
                                EVOL_VOLUME_ON_PERIOD = ((lastCandles[i].CAD_VOLUME - lastAvgVolumes[j].AVT_AVG_VOLUME_TRADE) / lastAvgVolumes[j].AVT_AVG_VOLUME_TRADE)*100;
                            }else{
                                EVOL_VOLUME_ON_PERIOD = 0;
                            }
                            if(lastAvgVolumes[j].AVT_NB_TRADES > 0){
                                EVOL_NB_TRADES_ON_PERIOD = ((lastCandles[i].CAD_NUMBER_OF_TRADES - lastAvgVolumes[j].AVT_NB_TRADES) / lastAvgVolumes[j].AVT_NB_TRADES)*100;
                            }else{
                                EVOL_NB_TRADES_ON_PERIOD = 0;
                            }


                            if(Math.abs(EVOL_VOLUME_ON_PERIOD) >= PMT_EVOL_VOLUME_ALERT){
                                EVOL_VOLUME_ON_PERIOD_STATUS = 'ALERT';
                            }else  if(Math.abs(EVOL_VOLUME_ON_PERIOD) >= PMT_EVOL_VOLUME_WARNING){
                                EVOL_VOLUME_ON_PERIOD_STATUS = 'WARNING';
                            }else{
                                EVOL_VOLUME_ON_PERIOD_STATUS = 'R-A-S';
                            }


                            if(Math.abs(EVOL_PRICE_ON_PERIOD) >= PMT_EVOL_PRICE_ALERT){
                                EVOL_PRICE_ON_PERIOD_STATUS = 'ALERT';
                                EVOL_PRICE_SINCE_WARNING = EVOL_PRICE_ON_PERIOD;
                            }else if(Math.abs(EVOL_PRICE_ON_PERIOD) >= PMT_EVOL_PRICE_WARNING){
                                EVOL_PRICE_ON_PERIOD_STATUS = 'WARNING';
                                EVOL_PRICE_SINCE_WARNING = EVOL_PRICE_ON_PERIOD;
                            }else{
                                EVOL_PRICE_ON_PERIOD_STATUS = 'R-A-S';
                                EVOL_PRICE_SINCE_WARNING = 0;
                            }

                            if(Math.abs(EVOL_NB_TRADES_ON_PERIOD) >= PMT_EVOL_NB_TRADE_ALERT){
                                EVOL_NB_TRADES_ON_PERIOD_STATUS = 'ALERT';
                            }else if(Math.abs(EVOL_NB_TRADES_ON_PERIOD) >= PMT_EVOL_NB_TRADE_WARNING){
                                EVOL_NB_TRADES_ON_PERIOD_STATUS = 'WARNING';
                            }else{
                                EVOL_NB_TRADES_ON_PERIOD_STATUS = 'R-A-S';
                            }

                            let line = [
                                uuidv1(),
                                now,
                                lastCandles[i].CAD_SYMBOL,
                                EVOL_VOLUME_ON_PERIOD,
                                EVOL_VOLUME_ON_PERIOD_STATUS,
                                EVOL_PRICE_ON_PERIOD,
                                EVOL_PRICE_ON_PERIOD_STATUS,
                                EVOL_NB_TRADES_ON_PERIOD,
                                EVOL_NB_TRADES_ON_PERIOD_STATUS,
                                CANDLE_PRICE_SINCE_WARNING,
                                EVOL_PRICE_SINCE_WARNING,
                                1
                            ];
                            values.push(line);
                        }
                    }
                }
            }else{
                for(let i=0; i<lastCandles.length; i++) {
                    for (let j = 0; j < lastAvgVolumes.length; j++) {
                        if(lastCandles[i].CAD_SYMBOL === lastAvgVolumes[j].AVT_SYMBOL){
                            for (let k = 0; k < lastEvolCrypto.length; k++) {
                                if(lastCandles[i].CAD_SYMBOL === lastEvolCrypto[k].EVC_SYMBOL){

                                    EVOL_PRICE_ON_PERIOD = ((lastCandles[i].CAD_CLOSE_PRICE - lastCandles[i].CAD_OPEN_PRICE) / lastCandles[i].CAD_OPEN_PRICE)*100;

                                    if(lastAvgVolumes[j].AVT_AVG_VOLUME_TRADE > 0){
                                        EVOL_VOLUME_ON_PERIOD = ((lastCandles[i].CAD_VOLUME - lastAvgVolumes[j].AVT_AVG_VOLUME_TRADE) / lastAvgVolumes[j].AVT_AVG_VOLUME_TRADE)*100;
                                    }else{
                                        EVOL_VOLUME_ON_PERIOD = 0;
                                    }
                                    if(lastAvgVolumes[j].AVT_NB_TRADES > 0){
                                        EVOL_NB_TRADES_ON_PERIOD = ((lastCandles[i].CAD_NUMBER_OF_TRADES - lastAvgVolumes[j].AVT_NB_TRADES) / lastAvgVolumes[j].AVT_NB_TRADES)*100;
                                    }else{
                                        EVOL_NB_TRADES_ON_PERIOD = 0;
                                    }

                                    if(Math.abs(EVOL_VOLUME_ON_PERIOD) >= PMT_EVOL_VOLUME_ALERT){
                                        EVOL_VOLUME_ON_PERIOD_STATUS = 'ALERT';
                                    }else if(Math.abs(EVOL_VOLUME_ON_PERIOD) >= PMT_EVOL_VOLUME_WARNING){
                                        EVOL_VOLUME_ON_PERIOD_STATUS = 'WARNING';
                                    }else{
                                        EVOL_VOLUME_ON_PERIOD_STATUS = 'R-A-ST';
                                    }

                                    if(Math.abs(EVOL_NB_TRADE_ON_PERIOD) >= PMT_EVOL_NB_TRADE_ALERT){
                                        EVOL_NB_TRADES_ON_PERIOD_STATUS = 'ALERT';
                                    }else if(Math.abs(EVOL_NB_TRADE_ON_PERIOD) >= PMT_EVOL_NB_TRADE_WARNING){
                                        EVOL_NB_TRADES_ON_PERIOD_STATUS = 'WARNING';
                                    }else{
                                        EVOL_NB_TRADES_ON_PERIOD_STATUS = 'R-A-S';
                                    }

                                    if(Math.abs(EVOL_PRICE_ON_PERIOD) >= PMT_EVOL_PRICE_ALERT){
                                        EVOL_PRICE_ON_PERIOD_STATUS = 'ALERT';
                                        if(lastEvolCrypto[k].EVOL_PRICE_ON_PERIOD_STATUS === 'WARNING' || lastEvolCrypto[k].EVOL_PRICE_ON_PERIOD_STATUS === 'ALERT'){
                                            EVOL_PRICE_SINCE_WARNING = ((lastCandles[i].CAD_CLOSE_PRICE - lastEvolCrypto[k].CANDLE_PRICE_SINCE_WARNING)/lastEvolCrypto[k].CANDLE_PRICE_SINCE_WARNING)*100;
                                            CANDLE_PRICE_SINCE_WARNING = lastEvolCrypto[k].CANDLE_PRICE_SINCE_WARNING;
                                        }else{
                                            EVOL_PRICE_SINCE_WARNING = EVOL_PRICE_ON_PERIOD;
                                            CANDLE_PRICE_SINCE_WARNING = lastCandles[i].CAD_CLOSE_PRICE;
                                        }
                                    }else if(Math.abs(EVOL_PRICE_ON_PERIOD) >= PMT_EVOL_PRICE_WARNING){
                                        EVOL_PRICE_ON_PERIOD_STATUS = 'WARNING';
                                        if(lastEvolCrypto[k].EVOL_PRICE_ON_PERIOD_STATUS === 'WARNING' || lastEvolCrypto[k].EVOL_PRICE_ON_PERIOD_STATUS === 'ALERT'){
                                            EVOL_PRICE_SINCE_WARNING = ((lastCandles[i].CAD_CLOSE_PRICE - lastEvolCrypto[k].CANDLE_PRICE_SINCE_WARNING)/lastEvolCrypto[k].CANDLE_PRICE_SINCE_WARNING)*100;
                                            CANDLE_PRICE_SINCE_WARNING = lastEvolCrypto[k].CANDLE_PRICE_SINCE_WARNING;
                                        }else{
                                            EVOL_PRICE_SINCE_WARNING = EVOL_PRICE_ON_PERIOD;
                                            CANDLE_PRICE_SINCE_WARNING = lastCandles[i].CAD_CLOSE_PRICE;
                                        }
                                    }else{
                                        EVOL_PRICE_ON_PERIOD_STATUS = 'R-A-S';
                                        EVOL_PRICE_SINCE_WARNING = 0;
                                        CANDLE_PRICE_SINCE_WARNING = 0;
                                    }

                                    let line = [
                                        uuidv1(),
                                        now,
                                        lastCandles[i].CAD_SYMBOL,
                                        EVOL_VOLUME_ON_PERIOD,
                                        EVOL_VOLUME_ON_PERIOD_STATUS,
                                        EVOL_PRICE_ON_PERIOD,
                                        EVOL_PRICE_ON_PERIOD_STATUS,
                                        EVOL_NB_TRADES_ON_PERIOD,
                                        EVOL_NB_TRADES_ON_PERIOD_STATUS,
                                        CANDLE_PRICE_SINCE_WARNING,
                                        EVOL_PRICE_SINCE_WARNING,
                                        1
                                    ];
                                    values.push(line);
                                }
                            }
                        }
                    }
                }
            }

            resolve(values);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
