import {initState} from "./initState";
import {compilerToFunction} from "./compile/index";

export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        // console.log(options)
        let vm = this
        vm.$options = options
        //初始化数据
        initState(vm)
        //处理模板
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        console.log(el)
        //el template render
        let vm = this
        el = document.querySelector(el)
        let options = vm.$options
        if(!options.render){
            let template = options.template
            if(!template && el){
                el = el.outerHTML
                console.log(el)
                let ast = compilerToFunction(el)
            }
        }
    }
}
