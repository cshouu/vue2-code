function createEl(vnode) {
    let {tag,children,key,data,text}=vnode
    if(typeof tag==='string'){//标签
        vnode.el=document.createElement(tag)
        if(children.length>0){
            children.forEach(child=>{
                vnode.el.appendChild(createEl(child))
            })
        }
    }else{
        vnode.el=document.createTextNode(text)
    }
    return vnode.el;
}

export function patch(oldVnode,vnode){
    // console.log(oldVnode,vnode)
    //vnode生成真实dom
    //1.创建dom
    let el=createEl(vnode)
    // console.log('el',el)
    //2替换
    let parentEl=oldVnode.parentNode
    parentEl.insertBefore(el,oldVnode.nextSibling)
    parentEl.removeChild(oldVnode)
    return el
}