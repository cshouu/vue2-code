let callback=[]
let pending=false

let timerFunc
if(Promise){
    timerFunc=()=>{
        Promise.resolve().then(flush)
    }
}else if(MutationObserver){//h5异步，监听dom变化，监控完毕后再异步更新
    let observe=new MutationObserver(flush)
    let textNode=document.createTextNode(1)//创建文本
    observe.observe(textNode,{characterData:true})//观测文本的内容
    timerFunc=()=>{
        textNode.textContent=2
    }
}else if(setImmediate){//IE
    setImmediate(flush)
}

function flush(){
    console.log('flush=========')
    callback.forEach(cb=>cb())
}
export function nextTick(cb){
    console.log(cb)
    callback.push(cb)
    if(!pending){
        timerFunc()
        pending=true
    }
}