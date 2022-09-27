const express = require('express');
const app = express();



// use => 무엇인가를 사용하겠다. Midleware 적용
// http method - get, post , put, delete, all 
// listen - 대기 

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
});
app.get('/a', (req, res) => {
    res.send('<h1>Hello World</h1>')
});
app.get('/b', (req, res) => {
    res.send('<h1>Hello World</h1>')
});

// routing path 별 처리해 주는 함수



// Status code 404
app.get('*', (req, res) => {
   res.status(404).send('Path not found.'); 
});

app.listen(3000, () =>{
    console.log('server is running at http://127.0.0.1:3000');
});