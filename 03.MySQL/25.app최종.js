const http = require('http');
const url = require('url');
const dm= require('./db-module');
const config = require('./mysql.json');
const template = require('./view/template');
const qs = require('querystring');

http.createServer((req,res) => {
    let pathname = url.parse(req.url).pathname;
    let query =url.parse(req.url, true).query;
    switch(pathname) {
        case'/' :       //초기 홈 화면
            dm.getList(rows => {
                let trs = template.trsGen(rows);
                let html =  template.home(trs);
                res.end(html);
            });
            break
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
                    
                    dm.insertPlayer([player,backNo,position], () =>{
                        res.writeHead(302, {'Location': `/`});
                        res.end();
                    });
                });
            };
            break;

        case '/update':
            if(req.method == 'GET'){      //수정 입력할 폼
                let id = parseInt(query.id);
                dm.getPlayer(id, rows => {
                    const player = rows[0].player;
                    const backNo = rows[0].backNo;
                    const position = rows[0].position;
                    const html = template.updateForm(id, player, backNo, position);
                    res.end(html);
                });
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

                    dm.updatePlayer([player,backNo,position,id],() =>{
                        res.writeHead(302, {'Location': `/`});
                        res.end();
                    });
                });
            }
            break;
        case '/delete':
            const did = parseInt(query.id);
            const html = template.deleteForm(did);
            res.end(html);
            break;
        case '/deleteConfirm':{
            const id = parseInt(query.id);
            dm.deletePlayerConfirm(id,() => {
                res.writeHead(302, {'Location': `/`});
                res.end();
            }); 
            };
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();

    }
}).listen(3000, () =>{
    console.log('server runnig at http://localhost:3000');
});