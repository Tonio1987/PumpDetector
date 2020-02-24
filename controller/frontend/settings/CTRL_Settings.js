const DB_Settings = require('../../../persistence/frontend/settings/DB_Settings');
const async = require('async');

module.exports = {
    getSettings: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getSettings,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getSettings(err, data) {
            DB_Settings.getSettings(STEP_finish);
        }

        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                callback(err, data, req, res, next);
            }else{
                callback(err, data, req, res, next);
            }
        }
    },editSettings: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_editSettings,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_editSettings() {
            DB_Settings.editSettings(STEP_finish, req.body.settings_id, req.body.settings_value);
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
