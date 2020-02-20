// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const moment = require('moment');

const DB_Parameters = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Parameters');
const DB_ExchangeInfo = require('../../../../persistence/backend/algorithm/evol_crypto/DB_ExchangeInfo');
const DB_Candles = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Candles');
const ALGO_EvolCrypto = require('../../../../algorithm/evol_crypto/EvolCrypto_Algorithm');

const async = require('async');

module.exports = {
    LoadEvolCrypto: function() {

        let now = moment().valueOf();

        async.waterfall([
            STEP_DB_getParameter,
            STEP_DB_getExchangeInfo,
            STEP_DB_getCandles,
            STEP_DB_getAVGVolume,
            STEP_DB_getLastEvolCtypto,
            STEP_DB_updateLastEvolCrypto,
            STEP_ALGO_calculateEvolCrypto,
            STEP_DB_insertEvolCrypto,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getParameter() {
            DB_Parameters.getAlgorithmParameters(STEP_DB_getExchangeInfo);
        }

        function STEP_DB_getExchangeInfo(err, parameters) {
            if(!err){
                DB_ExchangeInfo.getExchangeInfo(STEP_DB_getCandles, parameters);
            }else{
                STEP_finish(err, parameters);
            }
        }

        function STEP_DB_getCandles(err, data, parameters) {
            if(!err){
                for(let i=0; i<data.length; i++){
                    if(i === data.length-1){
                        DB_Candles.getLastCandle(STEP_DB_getCandles, data[i].EXI_SYMBOL, parameters ,true);
                    }else{
                        DB_Candles.getLastCandle(STEP_DB_getCandles, data[i].EXI_SYMBOL, parameters, false);
                    }
                }
            }else{
                STEP_finish(err, data);
            }
        }

        function  STEP_DB_getAVGVolume(err, data) {

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
