class varClass {
    constructor(func){
        this.state = "";
        this.result = "";
    }

    ret() {
        console.log('ret')
        return new varClass;
    }
    on() {
        console.log('on');
        return new varClass;
    }
    reject(msg) {
        this.result =msg;
        this.state = "rejected"

        return this;
    }
    resolve(msg) {
        this.result = msg;
        this.state = "resolved"
        return this;
    }
    then(func2) {
        if (this.state == "resolved"){
            func2(this.result)
        } 
        return this;
    }

    catch(func3){
        if (this.state == "rejected"){
            func3(this.result)
        }
        return this;
    }
};

let tempVar1 = new varClass();
tempVar1.reject("실패했어요");
tempVar1
.then((message)=>{
    console.log(message);
})
.resolve('성공했어요')
.catch((message)=>{
    console.log(message);
})
.then((message)=>{
    console.log(message);
})

