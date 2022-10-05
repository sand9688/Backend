


console.log('start');

class Human{
    constructor(param1){
        this.type = param1;
    }
    static isHuman(param1) {
        let tempVar = param1 instanceof Human
        return tempVar;
    }

    breath() {
        alert('ha-a-a-a-m');
    }
}


class Zero extends Human {
    constructor(param1,param2,param3){
        super(param1);
        this.firstname = param2;
        this.lastname = param3;
    }

    sayName(){
        super.breath();
        alert(`${this.firstname} ${this.lastname}`)
    }
}

const newZero =  new Zero('human','zero', 'cho');
Human.isHuman(newZero);


function wrapper() {
    let varLet5 = 1;
    const varConst5 = 2;
    var varVar5 = 3;
    varNone5 = 4;
    function inner(){
        let varLet6 = 1;
        const varConst6 = 2;
        var varVar6 = 3;
        varNone6 = 4;
    }
    inner();
}
wrapper();
console.log('start');
var relationsip1 = {
    name: 'zero',
    friends : ['zero','hero','xero'],
    logFriends : function(){
        var that = this;
        this.friends.forEach(function(param1) {console.log(that.name, param1)})
    }
}
relationsip1.logFriends();


console.log('start');
var relationsip2 = {
    name: 'zero',
    friends : ['zero','hero','xero'],
    logFriends() {
        this.friends.forEach(param1 => {console.log(this.name, param1)})
    }
}
relationsip2.logFriends();












let varLet1 = 1;
var varVar1 = 2;

//호이스트
{


    {console.log(1);
    let varlet2 = 1;
    var varVar2 = 2;
    }

    let varlet3 = 1;
    var varVar3 = 2;

}


console.log('bk')
function func() {
    let varlet4 = 1;
    var varVar4 = 2;
}

func();

