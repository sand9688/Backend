const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    fs.readFile('media/smaple_audio.mp3',(err,mp3)=>{
        res.writeHead(200, {'Content-Type': 'audio/mp3'});
        res.end(mp3);
    });
});

server.listen(3000);