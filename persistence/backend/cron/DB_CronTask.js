const moment = require('moment');
const db = require('../../db');

moment.locale('fr');

module.exports = {
    getCronTasks: function (callback) {
        new Promise(function (resolve, reject) {
            let sql = 'SELECT * FROM TS_CRON_TASK_CRT';
            db.connection.query(sql, [], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
