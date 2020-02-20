// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const moment = require('moment');

const API_Prices = require('../../../api/binance/API_Prices');
const DB_Prices = require('../../../persistence/backend/api/DB_Prices');
const async = require('async');

module.exports = {
    LoadPrices: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We load Prices via Binance API
            2 - We insert in DB the T_PRICES_PRS
         */
        let now = moment().valueOf();

        async.waterfall([
            STEP_API_getPrices,
            STEP_DB_insertPrices,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getPrices() {
            API_Prices.binance_Prices(STEP_DB_insertPrices);
        }

        function STEP_DB_insertPrices(err, data) {
            if(!err){
                DB_Prices.insertPrices(STEP_finish, data, now);
            }else{
                STEP_finish(err, data);
            }
        }

        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Prices ... [ FAILED ]');
            }

            logger.info('*** CONTROLLER *** ->  Process Load Prices ... [ DONE ]');
        }
    }
};
