const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);

conn.connect();
const sql =`SELECT gid, name, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDATE, song.title AS title  FROM girl_group JOIN song ON girl_group.hit_song_id = song.sid`;
conn.query(sql,(err, rows, fields) => {
    if (err)
        throw err;
    for (let row of rows){
        console.log(`${row.gid}\t${row.name}\t${row.debutDATE}\t${row.title}`)
    };
         
});

conn.end();
