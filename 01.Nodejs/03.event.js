process.on('exit', code => {
    console.log('프로그램 종료');
    console.log('exit code: ',code);
});

process.on('uncaughtException', error => {
    console.log('예외 발생');
    console.log('error code : ', error.message);
    console.log('error name : ', error.name)
});
// 예외 발생
error.error.error();

process.exit(0);