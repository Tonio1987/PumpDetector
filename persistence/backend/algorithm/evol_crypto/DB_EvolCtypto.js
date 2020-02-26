const moment = require('moment');
const db = require('../../../db');

moment.locale('fr');

module.exports = {
    getLastEvolCrypto: function (callback, param_fw1, param_fw2) {
        new Promise(function (resolve, reject) {

            let sql = 'SELECT * FROM T_ALGO_EVOL_CRYPTO_EVC WHERE EVC_LAST_INSERT = 1';
            db.connection.query(sql, [], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function (data) {
            callback(null, data, param_fw1, param_fw2);
        }).catch(function (err) {
            callback(err, null, param_fw1, param_fw2);
        });
    },
    updateLastEvolCrypto: function (callback, param_fw1, param_fw2, param_fw3) {
        new Promise(function (resolve, reject) {

            let sql = 'UPDATE T_ALGO_EVOL_CRYPTO_EVC SET EVC_LAST_INSERT = 0 WHERE EVC_LAST_INSERT = 1';
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
    },
    insertEvolCrypto: function (callback, values) {
        new Promise(function (resolve, reject) {

            let sql = "INSERT INTO T_ALGO_EVOL_CRYPTO_EVC (EVC_ID, EVC_DATETIME, EVC_SYMBOL, EVC_EVOL_VOLUME_ON_PERIOD, EVC_EVOL_VOLUME_ON_PERIOD_STATUS, EVC_EVOL_PRICE_ON_PERIOD, EVC_EVOL_PRICE_ON_PERIOD_STATUS, EVC_EVOL_NB_TRADES_ON_PERIOD, EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS, EVC_CANDLE_PRICE_SINCE_WARNING, EVC_EVOL_PRICE_SINCE_WARNING, EVC_NB_PERIOD, EVC_LAST_INSERT) VALUES ?";
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
    }
};
