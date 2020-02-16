// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_ExchangeInfo = require('../../../api/binance/API_ExchangeInfo');
const DB_ExchangeInfo = require('../../../persistence/backend/api/DB_ExchangeInfo');
const async = require('async');

module.exports = {
    LoadExchangeInfo: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We drop Exchange Info collection in DB
            2 - We load Exchange Info via Binance API
            3 - We insert in DB the T_EXCHANGE_INFO_EXI
         */

        async.waterfall([
            STEP_DB_dropExchangeInfo,
            STEP_API_getExchangeInfo,
            STEP_DB_insertExxchangeInfo,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_dropExchangeInfo() {
            DB_ExchangeInfo.dropExchangeInfo(STEP_API_getExchangeInfo);
        }

        function STEP_API_getExchangeInfo(err, data) {
            if(!err){
                API_ExchangeInfo.binance_ExchangeInfo(STEP_DB_insertExxchangeInfo);
            }else{
                STEP_finish(err, data);
            }

        }

        function STEP_DB_insertExxchangeInfo(err, data) {
            if(!err){
                DB_ExchangeInfo.insertExchangeInfo(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Exchange Info ... [ FAILED ]');
            }

            logger.info('*** CONTROLLER *** ->  Process Load Exchange Info ... [ DONE ]');
        }
    }
};
