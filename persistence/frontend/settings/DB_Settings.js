const moment = require('moment');
const db = require('../../db');

moment.locale('fr');

module.exports = {
    getSettings: function (callback) {
        new Promise(function (resolve, reject) {

            let sql = 'SELECT PMT_ID, PMT_ALGO, PMT_NAME, PMT_DESCR, PMT_VALUE FROM TR_PARAMETER_PMT ORDER BY PMT_ALGO';

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
    },editSettings: function (callback, id, value) {
        new Promise(function (resolve, reject) {

            let sql = 'UPDATE TR_PARAMETER_PMT SET PMT_VALUE = ? WHERE PMT_ID = ?';

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
