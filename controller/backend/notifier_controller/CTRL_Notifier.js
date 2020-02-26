// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const DB_EvolCrypto = require('../../../persistence/backend/notifier/DB_EvolCtypto');
const DB_Notifications = require('../../../persistence/backend/notifier/DB_Notifications');
const DB_ExchangeInfo = require('../../../persistence/backend/notifier/DB_ExchangeInfo');
const ALGO_Notifier = require('../../../algorithm/notifier/Notifier_Algorithm');
const async = require('async');

const moment = require('moment');
moment.locale('fr');

module.exports = {
    NotifyUsers: function() {

        let now = moment().format();

        async.waterfall([
            STEP_DB_updateNotifications,
            STEP_DB_getEvolCryptoAlertOrWarning,
            STEP_DB_getExchangeInfo,
            STEP_ALGO_prepareNotifications,
            STEP_DB_insertNotifications,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_updateNotifications() {
            DB_Notifications.updateNotifications(STEP_DB_getEvolCryptoAlertOrWarning);
        }

        function STEP_DB_getEvolCryptoAlertOrWarning(err, data) {
            if(!err){
                DB_EvolCrypto.getLastEvolCrypto(STEP_DB_getExchangeInfo)
            }else{
                STEP_finish(err, data);
            }
        }

        function STEP_DB_getExchangeInfo(err, EvolCrypto) {
            DB_ExchangeInfo.getExchangeInfo(STEP_ALGO_prepareNotifications, EvolCrypto);
        }

        function STEP_ALGO_prepareNotifications(err, ExchangeInfo, EvolCrypto) {
            if(!err){
                ALGO_Notifier.prepare_Notification(STEP_DB_insertNotifications, EvolCrypto, ExchangeInfo);
            }else{
                STEP_finish(err, EvolCrypto);
            }
        }

        function STEP_DB_insertNotifications(err, notifications) {
            if(!err && notifications != null){
                DB_Notifications.insertNotifications(STEP_finish, notifications, now);
            }else{
                STEP_finish(err, notifications);
            }
        }

        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Notify Users ... [ FAILED ]');
            }
            logger.info('*** CONTROLLER *** ->  Process Notify Users ... [ DONE ]');

        }
    }
};
