const dm = require('./db-module')

dm.getPlayersByPosition('투수', rows =>{
    for (let row of rows){
        console.log(row.id ,row.player, row.backNo,row.position)
    }
})