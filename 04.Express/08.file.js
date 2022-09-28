const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));

//multer setting
const upload = multer({ // 옵션 설정
    storage: multer.diskStorage({ //옵션 설정
        destination: __dirname + '/public/upload/',  //저장 위치 설정
        filename: (req, file, next) => {             // next 콜백 함수
            next(null, file.originalname);
        }
    })
});


// request header 값 읽기
app.get('/', (req, res) => {
    res.send('<h1>File Upload</h1>')
});

app.get('/file',(req,res)=> {
    fs.readFile('views/08.file.html', 'utf8',(err,html)=>{ 
        res.send(html);
    });
});
app.post('/file', upload.single('image'), (req,res)=>{
    const comment = req.body.comment;
    res.send(`<h1>comment : ${comment}</h1>`);
});
// Status code 404
app.get('*', (req, res) => {
   res.status(404).send('Path not found.'); 
});

app.listen(3000, () =>{
    console.log('server is running at http://127.0.0.1:3000');
});