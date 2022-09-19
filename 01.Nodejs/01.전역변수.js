const path  = require('path');


console.log(__dirname);
console.log(__filename);

//상대 경로(relative path)
const relPath = 'tmp/textfile.txt';

// 절대 경로(absolute path)
const absPath  = path.join(__dirname, 'tmp', 'textfile.txt');
console.log(absPath);