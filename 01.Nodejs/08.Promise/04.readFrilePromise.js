const fs = require('fs');

function readFilePromise(Path) {
    return new Promise ((resolve, reject) => {
        fs.readFile(Path,'utf8',(err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

readFilePromise('../07.File/tmp/a.txt')
    .then(val => {
        console.log(val);
        return readFilePromise('../07.File/tmp/b.txt')
    })
    .then(val => {
        console.log(val);
        return readFilePromise('../07.File/tmp/c.txt')
    })
    .then(console.log)