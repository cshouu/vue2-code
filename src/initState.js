import {observer} from "./observer/index";
import {nextTick} from "./utils/nextTick";

export function initState(vm){
    let opts = vm.$options
    // console.log(opts)
    if(opts.data){
        initData(vm)
    }
    if(opts.props){
        initProps()
    }
    if(opts.computed){
        initComputed()
    }
    if(opts.watch){
        initWatch()
    }
    if(opts.methods){
        initMethods()
    }
}

function proxy(vm, source, key) {
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}

function initData(vm) {
    // console.log('initData')
    let data = vm.$options.data
    data = vm._data = typeof data==='function'?data.call(vm):data
    // console.log(data)
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    observer(data)
}

function initProps() {

}

function initComputed() {

}

function initMethods() {

}

function initWatch() {

}

export function stateMixin(Vue){
    Vue.prototype.$nextTick=function(cb){//数据更新后获取到最新的dom
        nextTick(cb)
    }
}