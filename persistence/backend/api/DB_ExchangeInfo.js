const moment = require('moment');
const db = require('../../db');
const uuidv1 = require('uuid/v1');

moment.locale('fr');


module.exports = {
    dropExchangeInfo: function (callback) {
        new Promise(function (resolve, reject) {
            let sql = 'DELETE FROM T_API_EXCHANGE_INFO_EXI';
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
    },
    insertExchangeInfo: function (callback, data) {
        new Promise(function (resolve, reject) {
            let sql = "INSERT INTO T_API_EXCHANGE_INFO_EXI (EXI_ID, EXI_DATETIME, EXI_SYMBOL, EXI_STATUS, EXI_BASE_ASSET, EXI_BASE_ASSET_PRECISION, EXI_QUOTE_ASSET, EXI_QUOTE_PRECISION, EXI_ICEBERG_ALLOWED, EXI_ACTIVATED) VALUES ?";
            let id = uuidv1();
            let datetime = moment().format();
            let line = [];
            let values = [];
            for(let i=0; i< data.symbols.length; i++){
                line = [
                    id,
                    datetime,
                    data.symbols[i].symbol,
                    data.symbols[i].status,
                    data.symbols[i].baseAsset,
                    data.symbols[i].baseAssetPrecision,
                    data.symbols[i].quoteAsset,
                    data.symbols[i].quotePrecision,
                    data.symbols[i].icebergAllowed,
                    1
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
    },
    getExchangeInfo: function (callback) {
        new Promise(function (resolve, reject) {
            let sql = 'SELECT EXI_SYMBOL FROM T_API_EXCHANGE_INFO_EXI';

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
