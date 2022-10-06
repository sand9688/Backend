class varClass {
    ret() {
        console.log('ret')
        return new varClass;
    }
    on() {
        console.log('on');
        return new varClass;
    }ㄴ
};

let tempVar1 = new varClass();

let tempVar2 = tempVar1.ret().on();

//
