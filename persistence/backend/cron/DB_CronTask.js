const moment = require('moment');
const  mysql = require('mysql');

moment.locale('fr');

module.exports = {
    getCronTasks: function (callback) {
        new Promise(function (resolve, reject) {

            let con = mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            });

            con.connect(function(err) {
                if (err){
                    reject(err);
                }
                let sql = 'SELECT * FROM TS_CRON_TASK_CTK';
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
