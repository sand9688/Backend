const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');
const template = require('./views/tigers_template');
const multer = require('multer')

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
        let trs = template.trsGen(rows);
        let html =  template.home(trs);
        res.send(html);
    });
});
// 생성 화면
app.get('/create', (req,res) => {
    const html = template.createForm();
    res.send(html);
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
app.get('/update', (req,res) => { // http://localhost:3000/update>id=123
    const id = parseInt(req.query.id);
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        const html = template.updateForm(id, player, backNo, position);
        res.send(html);
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
app.get('/delete', (req,res) => {
    const id = parseInt(req.query.id)
    const html = template.deleteForm(id);
    res.send(html);
});
app.get('/deleteConfirm', (req, res) => {
    const id = parseInt(req.query.id);
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