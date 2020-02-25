// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');

const DB_Candles = require('../../../persistence/backend/purge/DB_Candles');

module.exports = {
    purgeData: function () {
        let timeAgo = moment(new Date()).add(-1, 'days').format();
        logger.warn('*** CONTROLLER *** ->  Process Purge Candles data ... [ RUNNING ]');
        async.waterfall([
            STEP_DB_purgeDate,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_purgeDate(err, data) {
            DB_Candles.purgeData(STEP_finish, timeAgo);
        }

        function STEP_finish(err, data) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Purge Candles data ... [ FAILED ]');
            }
            logger.warn('*** CONTROLLER *** ->  Process Purge Candles data ... [ DONE ]');
        }
    }
};