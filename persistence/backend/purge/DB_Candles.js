const moment = require('moment');
const db = require('../../db');

moment.locale('fr');

module.exports = {
    purgeData: function (callback, timeAgo) {
        new Promise(function (resolve, reject) {
            let delSince = [timeAgo];
            let sql = 'DELETE FROM T_API_CANDLE_CAD WHERE CAD_DATETIME < ? ';
            db.connection.query(sql, [delSince], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function (data) {
            callback(null, data);
        }).catch(function (err) {
            callback(err, null);
        });
    }
};
