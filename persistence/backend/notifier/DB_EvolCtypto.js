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
    getLastEvolCrypto: function (callback) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                /*
                SELECT * FROM T_ALGO_EVOL_CRYPTO_EVC
                WHERE EVC_LAST_INSERT = 1
                AND
                (
                    EVC_EVOL_VOLUME_ON_PERIOD_STATUS = 'ALERT'
                    OR EVC_EVOL_VOLUME_ON_PERIOD_STATUS = 'WARNING'
                    OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = 'ALERT'
                    OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = 'WARNING'
                    OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = 'ALERT'
                    OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = 'WARNING'
                )
                 */

                let alert = ['ALERT']
                let warning = ['WARNING']

                let sql = 'SELECT * FROM T_ALGO_EVOL_CRYPTO_EVC WHERE EVC_LAST_INSERT = 1 AND (EVC_EVOL_VOLUME_ON_PERIOD_STATUS = ? OR EVC_EVOL_VOLUME_ON_PERIOD_STATUS = ? OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = ? OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = ? OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = ? OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = ?)';

                con.query(sql, [alert, warning, alert, warning, alert, warning], function (err, result, fields) {
                    if (err){
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
