const mysql = require('mysql')
const config = require('./mysql.json')

module.exports = {
    getConnection: function(){
        const conn = mysql.createConnection(config);
        conn.connect(err => {
            if (err) {
                console.log('mysql connection err');
                console.log(err);
            };   
        });
        return conn;
    },
    getGirl_Group_List: function(callback){
        const conn = this.getConnection();
        const sql =`SELECT gid, name, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, song.title AS title FROM girl_group
                    JOIN song
                    ON girl_group.hit_song_id = song.sid`;
        conn.query(sql, (err, rows, fields) =>{
            if(err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getSong_list: function(callback){
        const conn = this.getConnection();
        const sql =`SELECT sid, title, lyrics, girl_group.name AS name FROM song
                    JOIN girl_group
                    ON song.sid= girl_group.hit_song_id `;
        conn.query(sql, (err, rows, fields) => {
            if(err)
                throw err
            callback(rows);
        });
        conn.end();
    },
    getSerch_gid: function(params, callback){
        const conn =this.getConnection();
        const sql =`SELECT gid, name, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, song.title AS title FROM girl_group
                    JOIN song
                    ON girl_group.hit_song_id = song.sid
                    WHERE gid = ?`
        conn.query(sql, params,(err, rows, fields)=>{
            if(err)
                throw err
            callback(rows);
        });
        conn.end();

    },
    getSerch_sid: function(params, callback){
        const conn = this.getConnection();
        const sql =`SELECT sid, title, lyrics, girl_group.name AS name FROM song
                    JOIN girl_group
                    ON song.sid= girl_group.hit_song_id
                    WHERE sid = ? `;
        conn.query(sql, params,(err, rows, fields) => {
            if(err)
                throw err
            callback(rows);
        });
        conn.end();
    },
    addGirl_Group: function(params, callback){
        const conn = this.getConnection();
        const sql = `INSERT INTO girl_group (NAME, debut, hit_song_id)
                    VALUES(?,?,?)`
        conn.query(sql, params, (err,fields)=>{
            if(err)
                throw err
            callback();
        });
        conn.end();
    },
    updateGirl_Group: function(params, callback){
        const conn = this.getConnection();
        const sql =`UPDATE girl_group SET NAME=?, debut=?, hit_song_id=?
                    WHERE gid=?`
        conn.query(sql, params, (err,fields) =>{
            if(err)
                throw err
            callback();
        });
        conn.end();
    },
    deleteGirl_Group: function(params, callback){
        const conn = this.getConnection();
        const sql =`DELETE FROM girl_group
                    WHERE gid=?`
        conn.query(sql, params, (err,fields) =>{
            if(err)
                throw err;
            callback();

        });
        conn.end();  
    },
    addSong: function(params, callback){
        const conn = this.getConnection();
        const sql = `INSERT INTO song (sid,title, lyrics)
                    VALUES(?,?,?)`
        conn.query(sql, params, (err,fields)=>{
            if(err)
                throw err
            callback();
        });
        conn.end();
    },
    updateSong: function(params, callback){
        const conn = this.getConnection();
        const sql =`UPDATE song SET title=?, lyrics=?
                    WHERE sid=?`
        conn.query(sql, params, (err,fields) =>{
            if(err)
                throw err
            callback();
        });
        conn.end();
    },
    deleteSong: function(params, callback){
        const conn = this.getConnection();
        const sql =`DELETE FROM song
                    WHERE sid=?`
        conn.query(sql, params, (err,fields) =>{
            if(err)
                throw err;
            callback();

        });
        conn.end();
    },
    checkGirl_Group: function(callback){
        const conn = this.getConnection();
        const sql =`SELECT * FROM girl_group`
        conn.query(sql, (err, rows, fields) => {
            if(err)
                throw err
            callback(rows);
        });
        conn.end();
    },
    checkSong: function(callback){
        const conn = this.getConnection();
        const sql =`SELECT * FROM song`
        conn.query(sql, (err, rows, fields) => {
            if(err)
                throw err
            callback(rows);
        });
        conn.end();
    },
    
};