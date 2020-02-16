// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_Candles = require('../../../api/binance/API_Candles');
const DB_ExchangeInfo = require('../../../persistence/backend/api/DB_ExchangeInfo');
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
            STEP_DB_getExchangeInfo,
            STEP_API_getCandles,
            STEP_DB_insertCandles,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getExchangeInfo() {
            DB_ExchangeInfo.getExchangeInfo(STEP_API_getCandles);
        }

        function STEP_API_getCandles(err, data) {
            for(let i=0; i<data.length; i++){
                if(i === data.length-1){
                    API_Candles.binance_Candles(STEP_DB_insertCandles, data[i].EXI_SYMBOL, "1m", timeAgo,true);
                }else{
                    API_Candles.binance_Candles(STEP_DB_insertCandles, data[i].EXI_SYMBOL, "1m", timeAgo,false);
                }
            }
        }

        function STEP_DB_insertCandles(err, data, symbol, iter) {
            if(!err){
                if(data.length>0){
                    DB_Candles.insertCandles(STEP_finish, data[0], symbol, iter);
                }else{
                    //logger.warn('*** CONTROLLER *** ->  No data for symbol  '+symbol+' !');
                    STEP_finish(err, data, iter);
                }
            }else{
                STEP_finish(err, data, iter);
            }
        }

        function STEP_finish(err, data, iter) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Candles ... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Load Candles ... [ DONE ]');
            }
        }
    }
};
