import {popTarget, pushTarget} from "./dep";
import {nextTick} from "../utils/nextTick";

let id=0
class watcher{
    constructor(vm,updateComponet,cb,options) {
        this.vm=vm
        this.exprOrfn=updateComponet
        this.cb=cb
        this.options=options
        this.id=id++
        this.deps=[]
        this.depsId=new Set()
        if(typeof updateComponet==='function'){
            this.getter=updateComponet //更新
        }
        this.get()
    }
    addDep(dep){
        //去重
        let id=dep.id
        if(!this.depsId.has(id)){
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
    }
    get(){
        pushTarget(this)
        this.getter()
        popTarget()
    }
    run(){
        this.getter()
    }
    update(){
        // this.getter()
        queueWatcher(this)
    }
}
let queue=[]//将需要批量更新的watcher存放到一个队列中
let has={}
let pending=false
function flushWatcher(){
    console.log('queue',queue)
    queue.forEach(watcher=>{watcher.run(), watcher.cb()})
    queue=[]
    has={}
    pending=false
}
function queueWatcher(watcher){
    let id=watcher.id
    console.log(id)
    console.log(has[id])
    if(!has[id]){
        queue.push(watcher)
        has[id]=true
        //防抖:用户触发多次，只执行一次
        if(!pending){
            // setTimeout(()=>{
            //     console.log('queue',queue)
            //     queue.forEach(item=>item.run())
            //     queue=[]
            //     has={}
            //     pending=false
            // },0)
            nextTick(flushWatcher) //相当于定时器
        }
        pending=true
    }
}
export default watcher