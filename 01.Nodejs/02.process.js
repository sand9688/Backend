console.log('process.env: ', process.env); //환경 설정
console.log(process.env.COMPUTERNAME);

console.log('process.version', process.version);// node js version

console.log('process.arch', process.arch);
console.log('process.paltform', process.platform);
console.log('process.argv', process.argv)

process.exit(0);  // 정상 종료, 코드값이 -1은 비정상 종료

console.log('프로세스'); //  unreachable
 // Hoisting

function aa(){
    let a=2;
    return a;
    let b = 3; // unreachable
}
var a = 5;