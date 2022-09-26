const mysql = require('mysql')
const config  = require('./mysql.json')

const conn = mysql.createConnection(config);

conn.connect()
let sql =`SELECT * FROM kia_tigers
WHERE position = ? AND isDeleted = ?;`;

conn.query(sql,['투수', 0], (err, rows, fields) => {
        if (err)
            throw err;
        for (let row of rows){
            console.log(`${row.id}\t${row.player}\t${row.backNo}\t${row.position}\t${row.isDeleted}`)
        }
             
    });
conn.end();    
