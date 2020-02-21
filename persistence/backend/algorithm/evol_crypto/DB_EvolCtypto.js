const moment = require('moment');
const mysql = require('mysql');
moment.locale('fr');

function createConnection(){
    let con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });
    return con;
}

module.exports = {
    getLastEvolCrypto: function (callback, param_fw1, param_fw2) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }

                let sql = 'SELECT * FROM T_ALGO_EVOL_CRYPTO_EVC WHERE EVC_LAST_INSERT = 1';
                con.query(sql, [], function (err, result, fields) {
                    if (err){
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data, param_fw1, param_fw2);
        }).catch(function (err) {
            callback(err, null, param_fw1, param_fw2);
        });
    },
    updateLastEvolCrypto: function (callback, param_fw1, param_fw2, param_fw3) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }

                let sql = 'UPDATE T_ALGO_EVOL_CRYPTO_EVC SET EVC_LAST_INSERT = 0 WHERE EVC_LAST_INSERT = 1';
                con.query(sql, [], function (err, result, fields) {
                    if (err){
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data, param_fw1, param_fw2, param_fw3);
        }).catch(function (err) {
            callback(err, null, param_fw1, param_fw2, param_fw3);
        });
    },
    insertEvolCrypto: function (callback, values) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = "INSERT INTO T_ALGO_EVOL_CRYPTO_EVC (EVC_ID, EVC_DATETIME, EVC_SYMBOL, EVC_EVOL_VOL_STATUS, EVC_EVOL_NB_TRADES_STATUS, EVC_EVOL_PRICE_STATUS, EVC_EVOL_OP_CL_PRICE_STATUS, EVC_EVOL_VOL, EVC_EVOL_NB_TRADES, EVC_EVOL_PRICE, EVC_EVOL_OP_CR_PRICE, EVC_LAST_INSERT) VALUES ?";

                con.query(sql, [values], function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data);
        }).catch(function (err) {
            callback(err, null);
        });
    }
};
