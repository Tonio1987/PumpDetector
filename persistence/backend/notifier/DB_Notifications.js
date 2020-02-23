const moment = require('moment');
const db = require('../../db');
const uuidv1 = require('uuid/v1');

moment.locale('fr');

module.exports = {
    insertNotifications: function (callback, notification, now) {
        new Promise(function (resolve, reject) {

            let sql = "INSERT INTO T_NOTIFICATIONS_NOT (NOT_ID, NOT_DATETIME, NOT_TEXT, NOT_LAST_NOTIFICATION) VALUES ?";
            let id = uuidv1();

            let values = [];

            let line = [
                id,
                now,
                notification,
                1
            ];
            values.push(line);

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
    updateNotifications: function (callback) {
        new Promise(function (resolve, reject) {
            let sql = 'UPDATE T_NOTIFICATIONS_NOT SET NOT_LAST_NOTIFICATION = 0 WHERE NOT_LAST_NOTIFICATION = 1';
            db.connection.query(sql, [], function (err, result) {
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
