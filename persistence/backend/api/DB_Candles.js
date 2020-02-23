const moment = require('moment');

const db = require('../../db');

const uuidv1 = require('uuid/v1');

moment.locale('fr');

module.exports = {
    insertCandles: function (callback, data, symbol, now, param_fw1) {
        new Promise(function (resolve, reject) {
            //let con = createConnection();

            let sql = "INSERT INTO T_API_CANDLE_CAD (CAD_ID, CAD_DATETIME, CAD_SYMBOL, CAD_OPEN_TIME, CAD_OPEN_DATETIME, CAD_OPEN_PRICE, CAD_HIGH_PRICE, CAD_LOW_PRICE, CAD_CLOSE_PRICE, CAD_VOLUME, CAD_CLOSE_TIME, CAD_CLOSE_DATETIME, CAD_QUOTE_ASSET_VOLUME, CAD_NUMBER_OF_TRADES, CAD_TAKER_BUY_BASE_ASSET_VOLUME, CAD_TAKER_BUY_QUOTE_ASSET_VOLUME) VALUES ?";

            let id = uuidv1();

            let line = [];
            let values = [];
            let openDateTime = moment(data.openTime).format();
            let closeDateTime = moment(data.closeTime).format();

            line = [
                id,
                now,
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

            db.connection.query(sql, [values], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

        }).then(function (data) {
            callback(null, data, param_fw1);
        }).catch(function (err) {
            callback(err, null, param_fw1);
        });
    }
};
