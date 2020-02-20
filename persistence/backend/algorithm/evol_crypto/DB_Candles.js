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
    getLastCandle: function (callback, symbol, parameters, param_fw1, param_fw2) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = 'SELECT * FROM T_API_CANDLE_CAD WHERE CAD_SYMBOL = ? AND CAD_DATETIME > ?';
                con.query(sql, [symbol, timeAgo],function (err, result, fields) {
                    if (err){
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data, symbol, param_fw1, param_fw2);
        }).catch(function (err) {
            callback(err, null, symbol, param_fw1, param_fw2);
        });
    }
};
