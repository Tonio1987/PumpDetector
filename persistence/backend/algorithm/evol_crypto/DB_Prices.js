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
    getPrices: function (callback, symbol, parameters, param_fw1) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            let nbPeriod = parameters[0].PMT_VALUE;
            let timeAgo = moment(new Date()).add(-nbPeriod, 'minutes').valueOf();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = 'SELECT * FROM T_API_PRICE_PRI WHERE PRI_SYMBOL = '+symbol+'AND PRI_DATETIME > '+timeAgo;
                con.query(sql, function (err, result, fields) {
                    if (err){
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data, symbol, parameters, param_fw1);
        }).catch(function (err) {
            callback(err, null, symbol, parameters, param_fw1);
        });
    }
};
