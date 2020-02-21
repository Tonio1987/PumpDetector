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
    getLastCandle: function (callback, param_fw1) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }

                let sql = 'SELECT * FROM T_API_CANDLE_CAD WHERE CAD_DATETIME = (SELECT MAX(CAD_DATETIME) FROM T_API_CANDLE_CAD)';
                con.query(sql, [], function (err, result, fields) {
                    if (err){
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
    }
};
