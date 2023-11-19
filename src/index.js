import {initMixin} from './init'
import {renderMixin} from "./vnode/index";
import {lifecycleMixin} from "./lifecycle";


function Vue(options) {
    // console.log(options)
    this._init(options)
}

initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)

export default Vue