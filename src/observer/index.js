export function observer(data){
    console.log(data)
    //处理对象
    //不劫持
    if(typeof data!='object' || data==null){
        return
    }
    //劫持
    return new Observer(data)
}

class Observer {
    constructor(data) {
        this.walk(data) //遍历
    }

    walk(data) {
        let keys = Object.keys(data)
        for(let i=0;i<keys.length;i++){
            let key=keys[i]
            let value = data[key]
            defineReactive(data,key,value)
        }
    }
}

function defineReactive(data, key, value) {
    observer(value)
    Object.defineProperty(data,key,{
        get(){
            console.log('获取')
            return value
        },
        set(newValve){
            console.log('set')
            if(newValve == value){
                return
            }
            observer(newValve)
            value = newValve
        }
    })
}