const moment = require('moment');
const db = require('../../db');

moment.locale('fr');

module.exports = {
    purgeData: function (callback, timeAgo) {
        new Promise(function (resolve, reject) {
            let sql = 'DELETE FROM T_ALGO_EVOL_CRYPTO_EVC WHERE EVC_DATETIME < '+timeAgo;
            db.connection.query(sql, [], function (err, result) {
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
