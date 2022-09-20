const fs = require('fs');

//디렉토리에 있는 파일 목록 불러오기
fs.readdir('tmp', (err,files) => {
    console.log(files);
});
// 파일의 정보
fs.stat('tmp/a.txt', (err, stats) => {
    console.log(stats.mtime);   // 최종수정시간
    console.log(stats.size);    // 파일의 크기;
})

// 디렉토리에 있는 파일에 대하여 최종 수정시간, 파일의 크기 ,파일이름표시
fs.readdir('tmp', (err,files) => {
    for (let i of files){
        fs.stat('tmp/'+i, (err,stats) => {
            console.log(`${stats.mtime}\t${stats.size}\t${i}`);
        })
    }
});

//파일 삭제하기
fs.unlink('tmp/single1.txt', err => {
    if (err)
        console.log(err);
});

//파일이름 변경하기

fs.rename('tmp/싱글.txt','tmp/single.txt', err => {
    if (err)
        console.log(err);
});