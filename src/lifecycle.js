import {patch} from "./patch";

export function mountComponent(vm,el){
    //_render将render函数变成vnode
    //_update将vnode变成真实dom
    callHook(vm,'beforeMount')
    vm._update(vm._render())
    callHook(vm,'mounted')
}

export function lifecycleMixin(Vue){
    //_update将vnode变成真实dom
    Vue.prototype._update=function(vnode){
        // console.log(vnode)
        let vm=this
        //两个参数，旧dom，vnode
        vm.$el=patch(vm.$el,vnode)
    }
}

export function callHook(vm,hook){
    console.log('hook',hook)
    const handlers=vm.$options[hook]
    if(handlers && handlers.length>0){
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(vm)
        }
    }
    console.log(handlers)
}