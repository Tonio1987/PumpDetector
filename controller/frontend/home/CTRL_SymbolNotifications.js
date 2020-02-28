const DB_Symbol_Notifications = require('../../../persistence/frontend/home/DB_SymbolNotification');
const async = require('async');

module.exports = {
    getSymbol_Notifications: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getSymbol_Notifications,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getSymbol_Notifications() {
            DB_Symbol_Notifications.getSymbol_Notifications(STEP_finish, req.body.symbol);
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
