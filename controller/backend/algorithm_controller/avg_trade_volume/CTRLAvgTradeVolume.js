// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const moment = require('moment');
moment.locale('fr');

const DB_Parameters = require('../../../../persistence/backend/algorithm/avg_trade_volume/DB_Parameters');
const DB_ExchangeInfo = require('../../../../persistence/backend/algorithm/avg_trade_volume/DB_ExchangeInfo');
const DB_Candles = require('../../../../persistence/backend/algorithm/avg_trade_volume/DB_Candles');
const DB_AvgVolumeTrades = require('../../../../persistence/backend/algorithm/avg_trade_volume/DB_AvgVolumeTrades');
const ALGO_AvgVolume = require('../../../../algorithm/avg_trade_volume/AvgVolume_Algo');


const async = require('async');

module.exports = {
    LoadEvolCrypto: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We load Candles via Binance API
            2 - We insert in DB the T_CANDLE_CAD
         */
        let now = moment().format();

        async.waterfall([
            STEP_DB_deletePreviousAvgVolume,
            STEP_DB_getParameter,
            STEP_DB_getExchangeInfo,
            STEP_DB_getCandles,
            STEP_DB_insertAvgVolumes,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_deletePreviousAvgVolume() {
            DB_AvgVolumeTrades.purgeData(STEP_DB_getParameter);
        }

        function STEP_DB_getParameter(err, data) {
            if(!err){
                DB_Parameters.getAlgorithmParameters(STEP_DB_getExchangeInfo);
            }else{
                STEP_finish(err, data);
            }
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
                        DB_Candles.getCandles(STEP_DB_insertAvgVolumes, data[i].EXI_SYMBOL, parameters ,true);
                    }else{
                        DB_Candles.getCandles(STEP_DB_insertAvgVolumes, data[i].EXI_SYMBOL, parameters, false);
                    }
                }
            }else{
                STEP_finish(err, data);
            }
        }

        function STEP_DB_insertAvgVolumes(err, data, symbol, iter) {
            if(!err){
                DB_AvgVolumeTrades.insertAvgVolumeTrades(STEP_finish, data, symbol, now, iter)
            }else{
                STEP_finish(err, data, iter);
            }
        }

        function STEP_finish(err, data, iter) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate Avg Volume ... [ FAILED ]');
            }

            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Calculate Avg Volume ... [ DONE ]');
            }
        }
    }
};
