// 호출 당하는 모듈
exports.randInt = function(from, to){
    return Math.floor(Math.random() * (to-from+1) + from);
}

exports.circleArea = radius => Math.PI * radius * radius