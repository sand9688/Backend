const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const members = [{uid : 'james', pwd: '1111', name: 'JAMES'},
                 {uid : 'maria', pwd: '2222', name: 'MARIA'}];

const server = http.createServer((req,res) => {
    let pathname = url.parse(req.url).pathname;
    let method = req.method;
    switch(pathname){
        case '/input':
            if (method === 'GET'){ //입력양식 화면을 사용자에게 보여줌
                fs.readFile('view/12.form.html','utf8',(err,html)=>{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(html);
                });
        
            } else { //method 가 POST 인 경우
                let body = '';
                req.on('data', data => {
                    body +=data;
                });
                req.on('end', ()=>{
                    const param = qs.parse(body);
                    const uid = param.uid
                    const pwd  = param.pwd
                    let flag = true;
                    for (let member of members){
                        if (member.uid == uid && member.pwd == pwd){
                            res.end(`Welcome ${member.name}`)
                            flag = false;
                        }
                    }
                    if (flag)
                        res.end(`<h1>Re-enter the form.</h1>`)
                });
            }
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
    };
    
});

server.listen(3000, () => {
    console.log('server runnig at http://localhost:3000')
});