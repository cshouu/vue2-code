import {patch} from "./patch";

export function mountComponent(vm,el){
    //_render将render函数变成vnode
    //_update将vnode变成真实dom
    vm._update(vm._render())
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