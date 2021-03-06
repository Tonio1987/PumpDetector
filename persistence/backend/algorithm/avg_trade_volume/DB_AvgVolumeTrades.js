const moment = require('moment');
const db = require('../../../db');

const uuidv1 = require('uuid/v1');

moment.locale('fr');


module.exports = {
    insertAvgVolumeTrades: function (callback, data, now) {
        new Promise(function (resolve, reject) {

            let sql = "INSERT INTO T_ALGO_AVG_VOL_TRADES_AVT (AVT_ID, AVT_DATETIME, AVT_SYMBOL, AVT_AVG_VOLUME_TRADE, AVT_NB_TRADES) VALUES ?";
            let id = uuidv1();
            let line = [];
            let values = [];

            for(let i=0; i<data.length; i++){
                line = [
                    id,
                    now,
                    data[i].CAD_SYMBOL,
                    data[i].AVG_CAD_VOLUME,
                    data[i].AVG_CAD_NB_TRADES
                ];
                values.push(line);
            }


            db.connection.query(sql, [values], function (err, result) {
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
    },
    purgeData: function (callback) {
        new Promise(function (resolve, reject) {

            let sql = 'DELETE FROM T_ALGO_AVG_VOL_TRADES_AVT';
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
