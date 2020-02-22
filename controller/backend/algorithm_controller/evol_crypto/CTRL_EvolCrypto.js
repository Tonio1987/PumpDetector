// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const moment = require('moment');

const DB_Parameters = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Parameters');
const DB_Candles = require('../../../../persistence/backend/algorithm/evol_crypto/DB_Candles');
const DB_AvgTradeVolume = require('../../../../persistence/backend/algorithm/evol_crypto/DB_AvgVolumeTrades');
const DB_EvolCtypto = require('../../../../persistence/backend/algorithm/evol_crypto/DB_EvolCtypto');
const ALGO_EvolCrypto = require('../../../../algorithm/evol_crypto/EvolCrypto_Algorithm');

const async = require('async');

module.exports = {
    LoadEvolCrypto: function() {

        let now = moment().format();

        async.waterfall([
            STEP_DB_getParameter,
            STEP_DB_getCandles,
            STEP_DB_getLastEvolCtypto,
            STEP_DB_updateLastEvolCrypto,
            STEP_DB_getLastAVGVolume,
            STEP_ALGO_calculateEvolCrypto,
            STEP_DB_insertEvolCrypto,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getParameter() {

            DB_Parameters.getAlgorithmParameters(STEP_DB_getCandles);
        }

        function STEP_DB_getCandles(err, parameters) {
            if(!err){
                DB_Candles.getLastCandle(STEP_DB_getLastEvolCtypto, parameters);
            }else{
                STEP_finish(err, parameters);
            }
        }

        function STEP_DB_getLastEvolCtypto(err, lastCandles, parameters) {
            if(!err){
                DB_EvolCtypto.getLastEvolCrypto(STEP_DB_updateLastEvolCrypto, lastCandles, parameters)
            }else{
                STEP_finish(err, lastCandles);
            }
        }

        function STEP_DB_updateLastEvolCrypto(err, lastEvolCrypto, lastCandles, parameters) {
            if(!err){
                DB_EvolCtypto.updateLastEvolCrypto(STEP_DB_getLastAVGVolume, lastEvolCrypto, lastCandles, parameters)
            }else{
                STEP_finish(err, lastEvolCrypto);
            }
        }

        function STEP_DB_getLastAVGVolume(err, res, lastEvolCrypto, lastCandles, parameters) {
            if(!err){
                DB_AvgTradeVolume.getLastAvgVolumeTrades(STEP_ALGO_calculateEvolCrypto, lastEvolCrypto, lastCandles, parameters)
            }else{
                STEP_finish(err, lastEvolCrypto);
            }
        }

        function STEP_ALGO_calculateEvolCrypto(err, lastAvgVolumes, lastEvolCrypto, lastCandles, parameters) {
            if(!err){
                ALGO_EvolCrypto.calculate_EvolCrypto(STEP_DB_insertEvolCrypto, lastAvgVolumes, lastEvolCrypto, lastCandles, parameters, now);
            }else{
                STEP_finish(err, lastAvgVolumes);
            }
        }

        function STEP_DB_insertEvolCrypto(err, valuesToInsert) {
            if(!err){
                DB_EvolCtypto.insertEvolCrypto(STEP_finish, valuesToInsert);
            }else{
                STEP_finish(err, valuesToInsert);
            }
        }

        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate Evol Cryppto ... [ FAILED ]');
            }
            logger.info('*** CONTROLLER *** ->  Process Calculate Evol Cryppto ... [ DONE ]');
        }
    }
};
