// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const DB_Parameters = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Parameters');
const DB_ExchangeInfo = require('../../../../persistence/backend/algorithm/evol_crypto/DB_ExchangeInfo');
const DB_Price = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Prices');
const DB_Candles = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Candles');

const DB_Candles = require('../../../persistence/backend/api/DB_Candles');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadCandles: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We load Candles via Binance API
            2 - We insert in DB the T_CANDLE_CAD
         */
        let timeAgo = moment(new Date()).add(-1, 'minutes').valueOf();

        async.waterfall([
            STEP_DB_getParameter,
            STEP_DB_getExchangeInfo,
            STEP_DB_getPrices,
            STEP_DB_getCandles,
            STEP_ALGO_calculateEvolCrypto,
            STEP_DB_insertCandles,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getParameter() {
            DB_Parameters.getAlgorithmParameters(STEP_DB_getExchangeInfo);
        }

        function STEP_DB_getExchangeInfo(err, parameters) {
            if(!err){
                DB_ExchangeInfo.getExchangeInfo(STEP_DB_getPrices, parameters);
            }else{
                STEP_finish(err, parameters);
            }
        }

        function STEP_DB_getPrices(err, data, parameters) {
            if(!err){
                for(let i=0; i<data.length; i++){
                    if(i === data.length-1){
                        DB_Price.getPrices(STEP_DB_getCandles, data[i].EXI_SYMBOL, parameters ,true);
                    }else{
                        DB_Price.getPrices(STEP_DB_getCandles, data[i].EXI_SYMBOL, parameters, false);
                    }
                }
            }else{
                STEP_finish(err, data);
            }
        }

        function STEP_DB_getCandles(err, prices, symbol, parameters, iter) {
            if(!err){
                DB_Candles.getCandles(STEP_ALGO_calculateEvolCrypto, data[0], symbol, iter);
            }else{
                STEP_finish(err, data, iter);
            }
        }

        function STEP_ALGO_calculateEvolCrypto(err, candles, prices, iter) {
            if(!err){

            }else{
                STEP_finish(err, data);
            }
        }

        function STEP_DB_insertCandles(err, candles, prices, iter) {
            if(!err){

            }else{
                STEP_finish(err, data);
            }
        }

        function STEP_finish(err, data, iter) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate Evol Cryppto ... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Calculate Evol Cryppto ... [ DONE ]');
            }
        }
    }
};
