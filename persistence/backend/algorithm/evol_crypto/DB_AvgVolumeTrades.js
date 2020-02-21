const moment = require('moment');
const mysql = require('mysql');
const uuidv1 = require('uuid/v1');

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
   getLastAvgVolumeTrades: function (callback, data, symbol, param_fw1) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = "INSERT INTO T_ALGO_AVG_VOL_TRADES_AVT (AVT_ID, AVT_DATETIME, AVT_SYMBOL, AVT_AVG_VOLUME_TRADE, AVT_NB_TRADES) VALUES ?";

                let id = uuidv1();
                let datetime = moment().format();
                let line = [];
                let values = [];

                line = [
                    id,
                    datetime,
                    symbol,
                    data[0],
                    data[1]

                ];
                values.push(line);

                con.query(sql, [values], function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data, param_fw1);
        }).catch(function (err) {
            callback(err, null, param_fw1);
        });
    },
    purgeData: function (callback) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = 'DELETE FROM T_ALGO_AVG_VOL_TRADES_AVT';
                con.query(sql, function (err, result, fields) {
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
