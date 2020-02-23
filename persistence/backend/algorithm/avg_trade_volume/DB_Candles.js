const moment = require('moment');
const db = require('../../../db');

moment.locale('fr');

module.exports = {
    getCandles: function (callback, parameters) {
        new Promise(function (resolve, reject) {

            let nbPeriod = parameters[0].PMT_VALUE;
            let timeAgo = moment(new Date()).add(-nbPeriod, 'minutes').valueOf();
            /*
            SELECT CAD_SYMBOL, AVG(CAD_VOLUME) AS AVG_CAD_VOLUME, AVG(CAD_NUMBER_OF_TRADES) AS AVG_CAD_NB_TRADES
            FROM T_API_CANDLE_CAD
            WHERE CAD_DATETIME > 1582491200000
            GROUP BY CAD_SYMBOL
            */



            let sql = 'SELECT CAD_SYMBOL, AVG(CAD_VOLUME) AS AVG_CAD_VOLUME, AVG(CAD_NUMBER_OF_TRADES) AS AVG_CAD_NB_TRADES FROM T_API_CANDLE_CAD WHERE CAD_DATETIME > ? GROUP BY CAD_SYMBOL';

            db.connection.query(sql, [timeAgo], function (err, result) {
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
