const moment = require('moment');
const db = require('../../db');

moment.locale('fr');

module.exports = {
    getLast_Notifications: function (callback, inputFilter) {
        new Promise(function (resolve, reject) {
            let alert = ['ALERT']
            let warning = ['WARNING']
            let filter = [inputFilter]


            /*
             SELECT * FROM T_ALGO_EVOL_CRYPTO_EVC
             WHERE EVC_LAST_INSERT = 1
             // OPTIONAL AND RIGHT(EVC_SYMBOL, 3)
             AND
             (
                 EVC_EVOL_VOLUME_ON_PERIOD_STATUS = 'ALERT'
                 OR EVC_EVOL_VOLUME_ON_PERIOD_STATUS = 'WARNING'
                 OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = 'ALERT'
                 OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = 'WARNING'
                 OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = 'ALERT'
                 OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = 'WARNING'
             )
             ORDER BY EVC_SYMBOL
              */
            if(inputFilter === 'ALL'){
                let sql = 'SELECT * FROM T_ALGO_EVOL_CRYPTO_EVC WHERE EVC_LAST_INSERT = 1 AND (EVC_EVOL_VOLUME_ON_PERIOD_STATUS = ? OR EVC_EVOL_VOLUME_ON_PERIOD_STATUS = ? OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = ? OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = ? OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = ? OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = ?) ORDER BY EVC_EVOL_PRICE_ON_PERIOD DESC';
                db.connection.query(sql, [alert, warning, alert, warning, alert, warning], function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            }else{
                let sql = 'SELECT * FROM T_ALGO_EVOL_CRYPTO_EVC WHERE EVC_LAST_INSERT = 1 AND RIGHT(EVC_SYMBOL, 3) = ? AND (EVC_EVOL_VOLUME_ON_PERIOD_STATUS = ? OR EVC_EVOL_VOLUME_ON_PERIOD_STATUS = ? OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = ? OR EVC_EVOL_PRICE_ON_PERIOD_STATUS = ? OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = ? OR EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS = ?) ORDER BY EVC_EVOL_PRICE_ON_PERIOD DESC';
                db.connection.query(sql, [filter, alert, warning, alert, warning, alert, warning], function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            }



        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
