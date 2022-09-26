const http = require('http');
const url = require('url');
const mysql = require('mysql');
const config = require('./mysql.json');
const template = require('./view/template');
const qs = require('querystring');

http.createServer((req,res) => {
    let pathname = url.parse(req.url).pathname;
    let query =url.parse(req.url, true).query;
    switch(pathname) {
        case'/' :       //초기 홈 화면
            const conn = mysql.createConnection(config);
            conn.connect();
            const sql =`SELECT * FROM kia_tigers WHERE isDeleted = 0 ;`;
            conn.query(sql, (err, rows ,fields) => {
                if (err)
                    throw err
                let trs = template.trsGen(rows);
                let html =  template.home(trs);
                res.end(html);
            })
            conn.end();
            break
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
        case '/create' :
            if (req.method == 'GET'){ //입력 폼 보여주기
                let html = template.createForm();
                res.end(html);
            }else {                    // 사용자가 입력 -> DB
                let body = '';
                req.on('data', data => {
                    body += data;
                });
                req.on('end', () => {
                    const param = qs.parse(body);
                    let player = param.player;
                    let backNo = parseInt(param.backNo);
                    let position = param.position;

                    const conn = mysql.createConnection(config);
                    conn.connect();
                    const sql =`
                    INSERT INTO kia_tigers(player, backNo, POSITION)
                        VALUES (?, ?, ?);`;
                    conn.query(sql, [player,backNo,position], (err,fields) => {
                        if (err)
                            throw err;
                        res.writeHead(302, {'Location': `/`});
                        res.end();

                    });
                    conn.end();
                    });
            };
            break;
        case '/update':
            if(req.method == 'GET'){      //수정 입력할 폼
                const id = parseInt(query.id);
                const conn = mysql.createConnection(config);
                conn.connect();
                const sql =`SELECT * FROM kia_tigers WHERE id=? AND isDeleted = 0 ;`;
                conn.query(sql, id, (err, rows ,fields) => {
                    if (err)
                        throw err
                    const player = rows[0].player;
                    const backNo = rows[0].backNo;
                    const position = rows[0].position;
                    const html = template.updateForm(id, player, backNo, position);
                    res.end(html);
                });
                conn.end();

            }else{                          // DB에 수정 하는 것
                let body = '';
                req.on('data', data => {
                    body += data;
                });
                req.on('end', () => {
                    const param = qs.parse(body);
                    let id = parseInt(param.id);
                    let player = param.player;
                    let backNo = parseInt(param.backNo);
                    let position = param.position;

                    const conn = mysql.createConnection(config);
                    conn.connect();
                    const sql =`
                    UPDATE kia_tigers SET player=?, backNo=?, POSITION=?
                        WHERE id=?;`;
                    conn.query(sql, [player,backNo,position, id], (err,fields) => {
                        if (err)
                            throw err;
                        res.writeHead(302, {'Location': `/`});
                        res.end();

                    });
                    conn.end();
                });
            }



            break;
    }
}).listen(3000, () =>{
    console.log('server runnig at http://localhost:3000');
});