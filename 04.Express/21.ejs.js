const express = require('express');
const ejs = require('ejs')
const fs = require('fs')
const app = express();

// request header 값 읽기
app.get('/', (req, res) => {
    res.send(`<h3>EJS page rendering</h3>`);
});
app.get('/data', (req,res)=>{
    fs.readFile('views/21.ejsPage.ejs','utf8', (err, data) => {
        const html = ejs.render(data, {title: 'fs로 파일에서 읽은 후 redering'});
        res.send(html);
    });
});
app.get('/file',(req,res) =>{
    ejs.renderFile('views/21.ejsPage.ejs', 
                    {title: 'ejs에서 직접 파일을 읽은 후 rendering'},
                    (err,html) => {
                        res.send(html);
                    })
})
// Status code 404
app.get('*', (req, res) => {
   res.status(404).send('Path not found.'); 
});

app.listen(3000, () =>{
    console.log('server is running at http://127.0.0.1:3000');
});