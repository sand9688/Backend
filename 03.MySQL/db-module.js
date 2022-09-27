const mysql = require('mysql')
const config = require('./mysql.json')

module.exports = {
    getConnection: function(){
        const conn = mysql.createConnection(config);
        conn.connect(err => {
            if (err)
                console.log('mysql connection err');
                console.log(err)
        });
        return conn;
    },
    getList : function(callback){
        const conn = this.getConnection();
        const sql =`SELECT * FROM kia_tigers WHERE isDeleted = 0 ;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    insertPlayer : function(params,callback) {
        const conn = this.getConnection();
        const sql =` INSERT INTO kia_tigers(player, backNo, POSITION)
                    VALUES (?, ?, ?);`;
        conn.query(sql, params, (err,fields) =>{
            if (err)
                throw err;
            callback();
        });
        conn.end();

    },
    updatePlayer : function(params,callback) {
        const conn = this.getConnection();
        const sql =` UPDATE kia_tigers SET player=?, backNo=?, POSITION=?
        WHERE id=?;`;
        conn.query(sql, params, (err,fields) =>{
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getPlayer: function(params,callback){
        const conn = this.getConnection();
        const sql =`SELECT * FROM kia_tigers WHERE id=? AND isDeleted = 0 ;`;
        conn.query(sql, params, (err, rows, fields) => {
            if (err)
                throw err
            callback(rows);
        });
        conn.end();
    },
    deletePlayerConfirm: function(params,callback){
        const conn = this.getConnection();
        const sql =`UPDATE kia_tigers SET isDeleted=1 WHERE id=?;`;
        conn.query(sql, params, (err,fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    }
        


}