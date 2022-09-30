const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');
const multer = require('multer');
const { response } = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public/kia_img'))

//multer setting
const upload = multer({ // 옵션 설정
    storage: multer.diskStorage({ //옵션 설정
        destination: __dirname + '/public/kia_img/',  //저장 위치 설정
        filename: (req, file, next) => {             // next 콜백 함수
            next(null, file.originalname);
        }
    })
});


// 초기 홈 화면
app.get('/', (req, res) => {
    dm.getList(rows => {
        ejs.renderFile('views/31.index.ejs',{rows:rows}, (err,html) =>{
            res.send(html);
        });
    });
});
// 생성 화면
app.get('/create', (req,res) => {
    ejs.renderFile('views/31.create.ejs',(err,html) => {
        res.send(html)
    })
});
app.post('/create', upload.single('image'),(req,res)=>{
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player,backNo,position], () =>{
        res.redirect('/');
    });
});


//update
app.get('/update/:id', (req,res) => { // http://localhost:3000/update>id=123
    const id = parseInt(req.params.id);
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        ejs.renderFile('views/31.update.ejs',{id: id, player: player, backNo:backNo, position:position},
         (err,html) => {
            res.send(html);
        });
    });
});
app.post('/update', (req,res) => {
    const id = parseInt(req.body.id);
    const player = req.body.player
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.updatePlayer([player,backNo,position,id] , ()=>{
        res.redirect('/');
    });
});

//삭제
app.get('/delete/:id', (req,res) => {
    const id = parseInt(req.params.id)
    ejs.renderFile('views/31.delete.ejs', { id:id }, 
    (err,html) => {
        res.send(html);
    });
});
app.get('/deleteConfirm/:id', (req, res) => {
    const id = req.params.id;
    dm.deletePlayer(id, () => {
        res.redirect('/');
    });
});




// Status code 404
app.get('*', (req, res) => {
   res.status(404).send('Path not found.'); 
});

app.listen(3000, () =>{
    console.log('server is running at http://127.0.0.1:3000');
});