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
    insertCandles: function (callback, data, symbol, param_fw1) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = "INSERT INTO T_API_CANDLE_CAD (CAD_ID, CAD_DATETIME, CAD_SYMBOL, CAD_OPEN_TIME, CAD_OPEN_DATETIME, CAD_OPEN_PRICE, CAD_HIGH_PRICE, CAD_LOW_PRICE, CAD_CLOSE_PRICE, CAD_VOLUME, CAD_CLOSE_TIME, CAD_CLOSE_DATETIME, CAD_QUOTE_ASSET_VOLUME, CAD_NUMBER_OF_TRADES, CAD_TAKER_BUY_BASE_ASSET_VOLUME, CAD_TAKER_BUY_QUOTE_ASSET_VOLUME) VALUES ?";

                let id = uuidv1();
                let datetime = moment().format();
                let line = [];
                let values = [];
                let openDateTime = moment(data.openTime).format();
                let closeDateTime = moment(data.closeTime).format();

                line = [
                    id,
                    datetime,
                    symbol,
                    data.openTime,
                    openDateTime,
                    data.open,
                    data.high,
                    data.low,
                    data.close,
                    data.volume,
                    data.closeTime,
                    closeDateTime,
                    data.quoteVolume,
                    data.trades,
                    data.baseAssetVolume,
                    data.quoteAssetVolume
                ];
                values.push(line);

                con.query(sql, [values], function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data, param_fw1);
        }).catch(function (err) {
            callback(err, null, param_fw1);
        });
    }
};
