const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const shoppingRouter = require('./routes/07.shoppingRouter.js');

const app = express();
const bbsRouter = express.Router();
const userRouter = express.Router();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));
app.use('/bbs', bbsRouter);
app.use('/user',userRouter);
app.use('/shopping',shoppingRouter);

// request header 값 읽기
app.get('/', (req, res) => {
    res.send('<h1>Router</h1>')
});

bbsRouter.get('/list', (req,res)=>{
    res.send('<h1>http://localhost:3000/bbs/list</h1>');
});

bbsRouter.get('/write', (req,res)=>{
    res.send('<h1>http://localhost:3000/bbs/write</h1>');
});
bbsRouter.get('/update', (req,res)=>{
    res.send('<h1>http://localhost:3000/bbs/update</h1>');
});

userRouter.get('/list',(req,res)=>{
    res.send('<h1>http://localhost:3000/user/list</h1>');
});
userRouter.get('/register',(req,res)=>{
    res.send('<h1>http://localhost:3000/user/register</h1>');
});
app.get('/login',(req,res)=> {
    fs.readFile('views/06.login.html', 'utf8',(err,html)=>{ 
        res.send(html);
    });
});
app.post('/login',(req,res)=>{
    const uid =req.body.uid;
    const pwd =req.body.pwd;
    res.send(`<h1>사용자 ID: ${uid}, 패스워드 : ${pwd}</h1>`)
})
// Status code 404
app.get('*', (req, res) => {
   res.status(404).send('Path not found.'); 
});

app.listen(3000, () =>{
    console.log('server is running at http://127.0.0.1:3000');
});