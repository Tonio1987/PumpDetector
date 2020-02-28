const moment = require('moment');
const db = require('../../db');

moment.locale('fr');

module.exports = {
    getCandles: function (callback, symbol) {
        new Promise(function (resolve, reject) {
            //let alert = ['ALERT'];
            //let warning = ['WARNING'];
            let symb = [symbol];

            let sql = 'SELECT * FROM T_API_CANDLE_CAD WHERE CAD_SYMBOL = ? ORDER BY CAD_DATETIME DESC';
            db.connection.query(sql, [symb], function (err, result) {
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
