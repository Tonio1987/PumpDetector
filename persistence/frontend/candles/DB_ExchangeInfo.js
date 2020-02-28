const moment = require('moment');
const db = require('../../db');
const uuidv1 = require('uuid/v1');

moment.locale('fr');

module.exports = {
    getExchangeInfo: function (callback) {
        new Promise(function (resolve, reject) {
            let sql = 'SELECT EXI_ID, EXI_SYMBOL FROM T_API_EXCHANGE_INFO_EXI ORDER BY EXI_SYMBOL ASC';
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
    }

};
