const moment = require('moment');
const db = require('../../db');
const uuidv1 = require('uuid/v1');

moment.locale('fr');

module.exports = {
    getExchangeInfo: function (callback) {
        new Promise(function (resolve, reject) {
            let sql = 'SELECT EXI_ID, EXI_SYMBOL, EXI_BASE_ASSET, EXI_QUOTE_ASSET, EXI_ACTIVATED FROM T_API_EXCHANGE_INFO_EXI ORDER BY EXI_QUOTE_ASSET ASC';
            db.connection.query(sql, [], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    },editPair: function (callback, id, value) {
        new Promise(function (resolve, reject) {
            if(value === 1){
                value = 0;
            }else{
                value = 1;
            }
            let sql = 'UPDATE T_API_EXCHANGE_INFO_EXI SET EXI_ACTIVATED = ? WHERE EXI_ID = ?';

            db.connection.query(sql, [value, id], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    }

};
