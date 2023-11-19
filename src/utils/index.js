let starts={}
starts.data=function (parentVal,childVal) {
    return childVal
}
starts.computed=function () {}
starts.watch=function () {}
starts.methods=function () {}
export const HOOKS=[
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]
HOOKS.forEach(hook=>{
    starts[hook]=mergeHook
})
function mergeHook(parentVal,childVal){
    if(childVal){
        if(parentVal){
            return parentVal.concat(childVal)
        }else{
            return [childVal]
        }
    }else{
        return parentVal
    }
}
export function mergeOptions(parent,child){
    // console.log('parent',parent,child)
    const options={}
    //parent存在，child不存在
    for(let key in parent){
        mergeField(key)
    }
    //parent不存在，child存在
    for(let key in child){
        mergeField(key)
    }
    // console.log('options',options)
    return options
    function mergeField(key) {
        if(starts[key]){
            options[key]=starts[key](parent[key],child[key])
        }else{
            options[key]=child[key]
        }
    }
}