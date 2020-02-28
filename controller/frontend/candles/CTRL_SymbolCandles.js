const DB_Candles = require('../../../persistence/frontend/candles/DB_Candles');
const async = require('async');

module.exports = {
    getSymbolCandles: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_geCandles,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_geCandles() {
            DB_Candles.getCandles(STEP_finish, req.body.symbol);
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
