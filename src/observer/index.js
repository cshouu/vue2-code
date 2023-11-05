import {ArrayMethods} from "./arr";

export function observer(data){
    // console.log(data)
    //处理对象
    //不劫持
    if(typeof data!='object' || data==null){
        return
    }
    //劫持
    return new Observer(data)
}

class Observer {
    constructor(value) {
        Object.defineProperty(value, '__ob__',{
            enumerable:false,
            value:this
        })
        // console.log(value)
        if(Array.isArray(value)){
            //劫持数组
            value.__proto__=ArrayMethods
            this.observeArray(value)
        }else{
            //劫持对象
            this.walk(value) //遍历
        }
    }

    walk(data) {
        let keys = Object.keys(data)
        for(let i=0;i<keys.length;i++){
            let key=keys[i]
            let value = data[key]
            defineReactive(data,key,value)
        }
    }

    observeArray(value) {
        for(let i=0;i<value.length;i++){
            // console.log(value[i])
            observer(value[i])
        }
    }
}

function defineReactive(data, key, value) {
    observer(value)
    Object.defineProperty(data,key,{
        get(){
            // console.log('object get')
            return value
        },
        set(newValve){
            // console.log('object set')
            if(newValve == value){
                return
            }
            observer(newValve)
            value = newValve
        }
    })
}