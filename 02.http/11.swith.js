const http = require('http');
const fs = require('fs');
const url = require('url')

const server = http.createServer((req,res) => {
    let pathname = url.parse(req.url).pathname;
    switch(pathname){
        case '/':
            fs.readFile('view/03.helloWorld.html','utf8',(err,html)=>{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });
            break;
        case '/image' :
            fs.readFile('media/고양이.jpg',(err,image)=>{
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(image);
            });
            break;
        case '/audio':
            fs.readFile('media/smaple_audio.mp3',(err,mp3)=>{
                res.writeHead(200, {'Content-Type': 'audio/mp3'});
                res.end(mp3);
            });
            break;
        case '/video':
            fs.readFile('media/file_example_MP4_480_1_5MG.mp4',(err,mp4)=>{
                res.writeHead(200, {'Content-Type': 'video/mp4'});
                res.end(mp4);
            });
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
    };
    
});

server.listen(3000, () => {
    console.log('server runnig at http://localhost:3000')
});