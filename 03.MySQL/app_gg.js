const http = require('http')
const url = require('url')
const template = require('./view/tamplate_gg')
const mysql = require('mysql')
const config = require('./mysql.json')

http.createServer((res,req) => {
    let pathname = url.parse(req.url).pathname;
    switch(pathname) {
        case '/': 
            const conn = mysql.createConnection(config);
            conn.connect();
            const sql = `SELECT NAME, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, song.title AS title FROM girl_group JOIN song ON girl_group.hit_song_id = song.sid`
            conn.query(sql, (err, rows, fields)=>{
                if (err)
                    throw err
                let song = template.singer(rows);
                let html = template.home(song);
                res.end(html)
            })
            conn.end();
            break
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();

    }
}).listen(3000, () =>{
    console.log('server runnig at http://localhost:3000');
});