const moment = require('moment');
const db = require('../../../db');

const uuidv1 = require('uuid/v1');

moment.locale('fr');

module.exports = {
   getLastAvgVolumeTrades: function (callback, param_fw1, param_fw2, param_fw3) {
        new Promise(function (resolve, reject) {

            let sql = 'SELECT * FROM T_ALGO_AVG_VOL_TRADES_AVT WHERE AVT_DATETIME = (SELECT MAX(AVT_DATETIME) FROM T_ALGO_AVG_VOL_TRADES_AVT)';
            db.connection.query(sql, [], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function (data) {
            callback(null, data, param_fw1, param_fw2, param_fw3);
        }).catch(function (err) {
            callback(err, null, param_fw1, param_fw2, param_fw3);
        });
    }
};
