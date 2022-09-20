const http  = require('http');
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=w_bgnb&bid2=LiveRanking&bid3=main&bid4=001'
const buffer = '';
const iconv = require('iconv-lite');
const fs = require('fs');
fs.unlink('tmp/books.txt', err => {
    if (err)
        console.log(err);
});
fs.writeFile('tmp/books.txt', buffer, error => {
    if (error)
        console.log(error);
});

axios.get(url, {responseType: 'arraybuffer'})
    .then(response =>{
        let contentType = response.headers['content-type']
        let charset = contentType.includes('charset=') ? contentType.split('charset=')[1] : 'UTF-8'
        let responseData = response.data
        let data = iconv.decode(responseData, charset)
        const $ = cheerio.load(data);
        $('.listItem.singleType').each((index, element) => {
            let title = $(element).find('.itemName strong').text().trim();
            let author = $(element).find('.author').text().trim();
            let company = $(element).find('.company').text().trim();
            let price = $(element).find('.price em').text().trim();
            let rank = index+1
            let books = `랭킹 : ${rank}\t제목 : ${title}\t작가 : ${author}\t출판소 : ${company}\t가격 : ${price} 원 \n`;
            console.log(books)
            fs.writeFile('tmp/books.txt',books, {flag:'a'}, err => {
                 if(err)
                     console.log(err);
             })
        });
    })
    
    .catch(err => {
        console.log(err)
    });

// const server = http.createServer((req,res) => {
//     fs.readFile('tmp/books.txt','utf8',(err,html) => {
//         res.writeHead(200, {'Content-Type' : 'text/html'});
//         res.end(html);
//     }); 
// });

// server.listen(3000);