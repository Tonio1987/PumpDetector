const moment = require('moment');
const db = require('../../db');
const uuidv1 = require('uuid/v1');

moment.locale('fr');



module.exports = {
    insertPrices: function (callback, data, now) {
        new Promise(function (resolve, reject) {
            let sql = "INSERT INTO T_API_PRICE_PRI (PRI_ID, PRI_DATETIME, PRI_SYMBOL, PRI_PRICE) VALUES ?";
            let id = uuidv1();
            let line = [];
            let values = [];
            for(let i in data){
                line = [
                    id,
                    now,
                    i,
                    data[i]
                ];
                values.push(line);
            }

            db.connection.query(sql, [values], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function (data) {
            callback(null, data);
        }).catch(function (err) {
            callback(err, null);
        });
    }
};
