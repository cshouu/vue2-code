import {observer} from "./observer/index";

export function initState(vm){
    let opts = vm.$options
    console.log(opts)
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

function initData(vm) {
    console.log('data初始化')
    let data = vm.$options.data
    data = vm._data = typeof data==='function'?data.call(vm):data
    console.log(data)
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