import {initState} from "./initState";
import {compilerToFunction} from "./compile/index";
import {callHook, mountComponent} from "./lifecycle";
import {mergeOptions} from "./utils/index";

export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        let vm = this
        vm.$options = mergeOptions(Vue.options,options)
        console.log('$options',vm.$options)
        callHook(vm,'beforeCreated')
        //初始化数据
        initState(vm)
        callHook(vm,'created')
        //处理模板
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        // console.log(el)
        //el template render
        let vm = this
        el = document.querySelector(el)
        vm.$el=el
        let options = vm.$options
        //编译模板
        if(!options.render){
            let template = options.template
            if(!template && el){
                el = el.outerHTML
                // console.log(el)
                //变成render函数
                let render = compilerToFunction(el)
                // console.log(render)
                //render变成vnode，vnode变成真实dom
                options.render=render
            }
        }
        //挂载组件
        mountComponent(vm,el)
    }
}
