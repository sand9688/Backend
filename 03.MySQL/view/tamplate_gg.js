module.exports = {
    home : function(song) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>걸그룹 히트송</title>
        </head>
        <body>
        <h1>걸그룹에 대뷔년도 와 히트송</h1>
            <table>
                <tr>
                    <td>걸그룹</td>
                    <td>데뷔 년도</td>
                    <td>히트송</td>
                </tr>
                ${song}
            </table>
        </body>
        </html>`
    },

    singer : function(rows){
        for (let row in rows){
            let song = '';
            song += `<tr>`
            song += `<td>${row.name}</td><td>${row.dabutDate}</td><td>${roq.title}</td>`
            song += `</tr>`
        }
        return song
    }
}