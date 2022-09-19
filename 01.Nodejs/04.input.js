const readline = require('readline');
const { buffer } = require('stream/consumers');
const r1 = readline.createInterface({
    input: process.stdin,                                   // standard input , terminal (keyboard)
    output : process.stdout                                 // standard output, terminal (monitor)
});

r1.setPrompt('숫자를 입력하세요');
r1.prompt();

r1.on('line', buffer => {  // 숫자를 입력하고 엔터를 쳤을때
    let num = parseInt(buffer);
    let evenOdd = (num%2 ==0) ? '짝수' :  '홀수' ;
    console.log(`입력한 숫자는  ${num} 이고. ${evenOdd}입니다.`);
    
    r1.close(); // 끝낼 때 반드시 처리해야 함
});

