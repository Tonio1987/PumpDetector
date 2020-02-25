const DB_Last_Notifications = require('../../../persistence/frontend/last_notif/DB_LastNotification');
const async = require('async');

module.exports = {
    getLast_Notifications: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getLast_Notifications,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLast_Notifications() {
            DB_Last_Notifications.getLast_Notifications(STEP_finish, req.body.filter);
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
