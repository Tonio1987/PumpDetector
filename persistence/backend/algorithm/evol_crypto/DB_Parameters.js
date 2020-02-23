const moment = require('moment');
const db = require('../../../db');


moment.locale('fr');

module.exports = {
    getAlgorithmParameters: function (callback) {
        new Promise(function (resolve, reject) {
            let PMT_ALGO = ["PUMP_DETECTOR"];
            let sql = 'SELECT PMT_NAME, PMT_VALUE FROM TR_PARAMETER_PMT WHERE PMT_ALGO = ?';
            db.connection.query(sql, [PMT_ALGO], function (err, result) {
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
