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
    insertNotifications: function (callback, notification, now) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = "INSERT INTO T_NOTIFICATIONS_NOT (NOT_ID, NOT_DATETIME, NOT_TEXT, NOT_LAST_NOTIFICATION) VALUES ?";
                let id = uuidv1();

                let line = [];
                let values = [];

                line = [
                    id,
                    now,
                    notification,
                    1
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
            callback(null, data);
        }).catch(function (err) {
            callback(err, null);
        });
    },
    updateNotifications: function (callback) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }

                let sql = 'UPDATE T_NOTIFICATIONS_NOT SET NOT_LAST_NOTIFICATION = 0 WHERE NOT_LAST_NOTIFICATION = 1';
                con.query(sql, [], function (err, result, fields) {
                    if (err){
                        reject(err);
                    }
                    con.destroy();
                    resolve(result);
                });
            });
        }).then(function (data) {
            callback(null, data);
        }).catch(function (err) {
            callback(err, null);
        });
    }
};
