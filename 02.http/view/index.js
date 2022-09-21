exports.index = function(title,list,content,control){
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>     <!--22.app조회.js에서 변경 -->
</head>
<body style="margin: 50px;">
    <h1><a href='/'>웹 기술</a></h1>
    <ul>
        ${list}    <!--22.applist.js에서 변경 -->
    </ul>
    <hr>
    <p>
        ${content}  <!--22.app조회.js에서 변경 -->
    </p>
    <hr>
        ${control} <!--24.app생성.js에서 변경 -->
</body>
</html>`;
}