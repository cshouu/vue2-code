import {initMixin} from './init'
import {renderMixin} from "./vnode/index";
import {lifecycleMixin} from "./lifecycle";
import {initGlobApi} from "./global-api/index";
import {stateMixin} from "./initState";


function Vue(options) {
    // console.log(options)
    this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
stateMixin(Vue) //$nextTick
//全局方法
initGlobApi(Vue)

export default Vue