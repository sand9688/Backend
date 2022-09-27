const dm = require('./db-module')

//걸그룹 리스트 조회
dm.getGirl_Group_List(rows => {
    console.log('걸그룹 리스트 조회')
    for (let row of rows){
        console.log(row.gid, row.name, row.debutDate, row.title)
    }
    console.log('==============================================')
});
//송 리스트 조회
dm.getSong_list(rows => {
    console.log('송 리스트 조회')
    for (let row of rows){
        console.log(row.sid, row.title, row.lyrics, row.name)
    }
    console.log('==============================================')
});

//걸그룹 검색(gid로)
dm.getSerch_gid(1, rows=> {
    console.log('걸그룹 검색(gid로) gid=1')
    console.log(rows[0].gid, rows[0].name, rows[0].debutDate, rows[0].title)
    console.log('==============================================')
});
//송 검색(sid로)
dm.getSerch_sid(105, rows=> {
    console.log('송 검색(sid로) sid =105')
    console.log(rows[0].sid, rows[0].title, rows[0].lyrics, rows[0].name)
    console.log('==============================================')
});

//걸그룹 추가
dm.addGirl_Group(['test3', '2022-09-27', 995], () =>{
    console.log('걸그룹 추가[test3, 2022-09-27, 995]')
});
//  송 추가
dm.addSong([995,'test','test'],()=>{
    console.log('송추가 [995,test,test]')
})


//걸그룹 수정
dm.updateGirl_Group(['TEST','2022-10-01',995, 14],()=> {
    console.log('[TEST,2022-10-01,995, 14]으로 수정')
});
//송 수정
dm.updateSong(['TEST','TEST',995],()=> {
    console.log('[TEST,TEST,995]으로 수정')
});

// 추가확인
dm.getGirl_Group_List(rows => {
    console.log('추가 조회')
    for (let row of rows){
        console.log(row.gid, row.name, row.debutDate, row.title)
    }
    console.log('==============================================')
});

//걸그룹 삭제
dm.deleteGirl_Group(18,()=>{
    console.log('gid=14 삭제 확인')
    dm.checkGirl_Group(rows=>{
        for(let row of rows){
            console.log(row.gid,row.name)
        }
    })
});
// 송 삭제
dm.deleteSong(995, ()=>{
    console.log('sid=995 삭제 확인')
    dm.checkSong(rows=>{
        for(let row of rows){
            console.log(row.sid, row.title)
        }
    })
});

