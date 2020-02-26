const moment = require('moment');
const db = require('../../db');

const uuidv1 = require('uuid/v1');

moment.locale('fr');

module.exports = {
    getExchangeInfo: function (callback, param_fw1) {
        new Promise(function (resolve, reject) {
            let sql = 'SELECT EXI_SYMBOL FROM T_API_EXCHANGE_INFO_EXI WHERE EXI_ACTIVATED = 1';
            db.connection.query(sql, [], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function(data){
            callback(null, data, param_fw1);
        }).catch(function(err) {
            callback(err, null, param_fw1);
        });
    }

};
