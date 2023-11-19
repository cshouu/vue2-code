import {initMixin} from './init'
import {renderMixin} from "./vnode/index";
import {lifecycleMixin} from "./lifecycle";
import {initGlobApi} from "./global-api/index";


function Vue(options) {
    // console.log(options)
    this._init(options)
}

initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
//全局方法
initGlobApi(Vue)

export default Vue