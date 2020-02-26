const DB_ExchangeInfo = require('../../../persistence/frontend/pairs/DB_ExchangeInfo');
const async = require('async');

module.exports = {
    getExchangeInfo: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_geExchangeInfo,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_geExchangeInfo() {
            DB_ExchangeInfo.getExchangeInfo(STEP_finish);
        }

        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                callback(err, data, req, res, next);
            }else{
                callback(err, data, req, res, next);
            }
        }
    },editPair: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_editSettings,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_editSettings() {
            DB_ExchangeInfo.editPair(STEP_finish, req.body.pair_id, req.body.pair_active);
        }

        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                callback(err, data, req, res, next);
            }else{
                callback(err, data, req, res, next);
            }
        }
    }
};
