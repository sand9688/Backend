const spawn = require('child_process').spawn;
var varpath = '03.BackEnd\\04.Express\\child_process.py'
var process = spawn('python',['03.Backend/04.Express/child_process.py']);

var process2 = spawn('python',[varpath]);

process.stdout.on('data', function(data) {
    console.log(data.toString()+ 'path없이 출력')
})

process.stderr.on('data', function(data) {
    console.log(data.toString())
})
process2.stdout.on('data', function(data) {
    console.log(data.toString()+ 'path 사용하여 출력')
})

process2.stderr.on('data', function(data) {
    console.log(data.toString())
})