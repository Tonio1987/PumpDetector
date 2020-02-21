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
    insertPrices: function (callback, data, now) {
        new Promise(function (resolve, reject) {
            let con = createConnection();
            con.connect(function (err) {
                if (err) {
                    reject(err);
                }
                let sql = "INSERT INTO T_API_PRICE_PRI (PRI_ID, PRI_DATETIME, PRI_SYMBOL, PRI_PRICE) VALUES ?";
                console.log(now);
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
    }
};
