const async= require('async');
const fs = require('fs');


async.parallel({
    bufA: function(callback){
        fs.readFile('07.file/tmp/a.txt', 'utf8',callback);
    },
    bufB: function(callback){
        fs.readFile('07.file/tmp/b.txt', 'utf8',callback);
    },
    bufC: function(callback){
        fs.readFile('07.file/tmp/c.txt', 'utf8',callback);
    }
}, (err,results) => {
    console.log(results.bufA);
    console.log(results.bufB);
    console.log(results.bufC);
});