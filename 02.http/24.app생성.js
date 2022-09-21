const http = require('http');
const url  = require('url');
const fs = require('fs');
const qs = require('querystring');
const view =require('./view/index');
const template = require('./view/template');

http.createServer((req,res) => {
    let pathname = url.parse(req.url).pathname;
    let query = url.parse(req.url, true).query;
    switch(pathname){
        case '/':
            if(query.id === undefined){ //초기화면
                fs.readdir('data', (err,files) => {
                    const title = '웹 기술' ;
                    const list = template.listGen(files);
                    const content = template.HOME_CONTENTS.replace(/\n/g,'<br>');
                    const control = template.buttonGen();
                    const html = view.index(title, list, content, control);
                    res.end(html);
                });
            }else{                  //개별 아이템에 대한 화면
                fs.readdir('data', (err,files) => {
                    const title = query.id ;
                    const list = template.listGen(files);
                    const filename = `data/${query.id}.txt`;
                    fs.readFile(filename, 'utf8', (err, data) => {
                        let content = data.replace(/\n/g,'<br>')
                        const control = template.buttonGen(title);
                        const html = view.index(title, list, content,control);
                        res.end(html);
                    });
                    
                });
            };    
            break;

        case '/create': //생성
            if (req.method === 'GET'){
                fs.readdir('data', (err,files) => {
                    const title = '글 생성' ;
                    const list = template.listGen(files);
                    const content = template.creatForm();
                    const html = view.index(title, list, content, ' ');
                    res.end(html);
                });
            }else{
                let body = '';
                req.on('data', data => {
                    body +=data;
                });
                req.on('end', () => {
                    const param = qs.parse(body);
                    if (param.title.trim().length==0){
                        res.writeHead(302, {'Location' : `/`});
                        res.end();
                    }else {
                        const fsname = `data/${param.title}.txt`;
                        fs.writeFile(fsname, param.content, err => {
                        res.writeHead(302, {'Location' : `/?id=${param.title}`});
                        res.end()
                    });
                    }
                    
                });
            }
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
    };
}).listen(3000, () => {
    console.log('server runnig at http://localhost:3000')
});