const DB_ExchangeInfo = require('../../../persistence/frontend/candles/DB_ExchangeInfo');
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
            DB_ExchangeInfo.getExchangeInfo(STEP_finish, req.body.pair);
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
