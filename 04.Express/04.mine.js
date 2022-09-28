const express = require('express');
const app = express();
const fs = require('fs')

// request header 값 읽기
app.get('/', (req, res) => {
    res.send('<h1>MIME</h1>')
});
//image
app.get('/image',(req,res)=> {
    fs.readFile('public/고양이.jpg', (err,image)=>{
        res.type('image/jpg');  //MIME type
        res.send(image);
    })
})
//audio
app.get('/audio',(req,res)=> {
    fs.readFile('public/mp3_sample.mp3', (err,audio)=>{
        res.type('audio/mp3');  //MIME type
        res.send(audio);
    })
})
// Status code 404
app.get('*', (req, res) => {
   res.status(404).send('Path not found.'); 
});

app.listen(3000, () =>{
    console.log('server is running at http://127.0.0.1:3000');
});