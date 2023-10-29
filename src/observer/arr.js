//重写数组
//1 获取原来的数组方法
let oldArrayProtoMethods = Array.prototype
// console.log('oldArrayProtoMethods',oldArrayProtoMethods)
//2 继承
export let ArrayMethods = Object.create(oldArrayProtoMethods)
// console.log('ArrayMethods',ArrayMethods)
//3 劫持
let methods = [
    "push",
    "pop",
    "unshift",
    "shift",
    "splice"
]
methods.forEach(item=>{
    ArrayMethods[item] = function (...args){
        // console.log('ArrayMethods', item)
        let result = oldArrayProtoMethods[item].apply(this,args)
        let inserted
        switch (item){
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.splice(2)
                break
        }
        // console.log(inserted)
        let ob = this.__ob__
        if(inserted){
            ob.observeArray(inserted)
        }
        return result
    }
})
