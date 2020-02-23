const moment = require('moment');
const db = require('../../../db');

moment.locale('fr');


module.exports = {
    getLastCandle: function (callback, param_fw1) {
        new Promise(function (resolve, reject) {

            let sql = 'SELECT * FROM T_API_CANDLE_CAD WHERE CAD_DATETIME = (SELECT MAX(CAD_DATETIME) FROM T_API_CANDLE_CAD)';

            db.connection.query(sql, [], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function (data) {
            callback(null, data, param_fw1);
        }).catch(function (err) {
            callback(err, null, param_fw1);
        });
    }
};
