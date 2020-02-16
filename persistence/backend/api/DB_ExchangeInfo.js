const moment = require('moment');
const mysql = require('mysql');
const uuidv1 = require('uuid/v1');

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
    dropExchangeInfo: function (callback) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = 'DELETE FROM T_EXCHANGE_INFO_EXI';
                con.query(sql, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    // console.log("Number of records deleted: " + result.affectedRows);
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data);
        }).catch(function (err) {
            callback(err, null);
        });
    },
    insertExchangeInfo: function (callback, data) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = "INSERT INTO T_EXCHANGE_INFO_EXI (EXI_ID, EXI_DATETIME, EXI_SYMBOL, EXI_STATUS, EXI_BASE_ASSET, EXI_BASE_ASSET_PRECISION, EXI_QUOTE_ASSET, EXI_QUOTE_PRECISION, EXI_ICEBERG_ALLOWED) VALUES ?";
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
                        data.symbols[i].icebergAllowed
                    ];
                    values.push(line);
                }
                con.query(sql, [values], function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    // console.log("Number of records deleted: " + result.affectedRows);
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data);
        }).catch(function (err) {
            callback(err, null);
        });
    },
    getExchangeInfo: function (callback) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function(err) {
                if (err){
                    reject(err);
                }
                let sql = 'SELECT EXI_SYMBOL FROM T_EXCHANGE_INFO_EXI';
                con.query(sql, function (err, result, fields) {
                    if (err){
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    }

};
