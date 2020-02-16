// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const DB_Parameters = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Parameters');
const DB_ExchangeInfo = require('../../../../persistence/backend/algorithm/evol_crypto/DB_ExchangeInfo');
const DB_Price = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Prices');
const DB_Candles = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Candles');
const ALGO_EvolCrypto = require('../../../../algorithm/evol_crypto/EvolCrypto_Algorithm');

const async = require('async');

module.exports = {
    LoadEvolCrypto: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We load Candles via Binance API
            2 - We insert in DB the T_CANDLE_CAD
         */

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
                DB_Candles.getCandles(STEP_ALGO_calculateEvolCrypto, symbol, parameters, prices, iter);
            }else{
                STEP_finish(err, prices, iter);
            }
        }

        function STEP_ALGO_calculateEvolCrypto(err, candles, symbol, prices, iter) {
            if(!err){
                ALGO_EvolCrypto.calculate_EvolCrypto(STEP_DB_insertCandles, candles, symbol, prices, iter);
            }else{
                STEP_finish(err, candles, iter);
            }
        }

        function STEP_DB_insertCandles(err, data, iter) {
            if(!err){

            }else{
                STEP_finish(err, data, iter);
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
