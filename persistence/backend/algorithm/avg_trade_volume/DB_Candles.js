const moment = require('moment');
const db = require('../../../db');

moment.locale('fr');

module.exports = {
    getCandles: function (callback, symbol, parameters, param_fw1) {
        new Promise(function (resolve, reject) {

            let nbPeriod = parameters[0].PMT_VALUE;
            let timeAgo = moment(new Date()).add(-nbPeriod, 'minutes').valueOf();
            let sql = 'SELECT AVG(CAD_VOLUME) AS AVG_CAD_VOLUME, AVG(CAD_NUMBER_OF_TRADES) AS AVG_CAD_NB_TRADES FROM T_API_CANDLE_CAD WHERE CAD_SYMBOL = ? AND CAD_DATETIME > ?';

            db.connection.query(sql, [symbol, timeAgo], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function (data) {
            callback(null, data, symbol, param_fw1);
        }).catch(function (err) {
            callback(err, null, symbol, param_fw1);
        });
    }
};
