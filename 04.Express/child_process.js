const spawn = require('child_process').spawn;

var process = spawn('python',['child_process.py']);

process.stdout.on('data', function(data) {
    console.log(data.toString())
})