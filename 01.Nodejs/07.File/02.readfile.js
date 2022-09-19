//비동기적(Asynhronous)으로 읽기 - 권장사항

const fs = require('fs');
fs.readFile('tmp/textfile.txt','utf8', (err,data) => {
    // if (err){ 나중에 production(실제 서비스 해주는 상황)에서는 에러 처리를 반드시 할 것
    //     console.log(err);
    // }else{
    //     console.log('파일에서 읽은 데이터: ', data);
    // }
    //파일의 에러는 잘 발생하지 않으므로 error 처리를 생략
    console.log('파일에서 읽은 데이터: ', data);
});