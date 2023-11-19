const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g //{{}}
function gen(node) {
    if(node.type===1){ //元素
        return generate(node)
    }else{ //文本
        let text=node.text
        if(!defaultTagRE.test(text)){
            return `_v(${text})`
        }
        let tokens=[]
        let lastindex=defaultTagRE.lastIndex=0
        let match
        while (match=defaultTagRE.exec(text)){
            console.log('match',match)
            let index=match.index
            if(index>lastindex){
                tokens.push(JSON.stringify(text.slice(lastindex,index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastindex=index+match[0].length
            if(lastindex<text.length){
                tokens.push(JSON.stringify(text.slice(lastindex)))
            }
        }
        return `_v(${tokens.join('+')})`
    }
}

function genChildren(el) {
    let children=el.children
    if(children){
        let arr=children.map(child=>gen(child))
        // console.log('arr',arr)
        return arr.join(',')
    }
}

function genProps(attrs){
    let str=''
    for(let i=0;i<attrs.length;i++){
        let attr = attrs[i]
        if(attr.name==='style'){
            let obj={}
            attr.value.trim().split(';').forEach(item=>{
                item=item.trim()
                if(item){
                    let [key,val]=item.split(':')
                    obj[key.trim()]=val.trim()
                }
            })
            attr.value=obj
        }
        str+=`${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0,-1)}}`
}

export function generate(el){
    console.log(el)
    let children=genChildren(el)
    let code=`_c(${el.tag},${el.attrs.length ? genProps(el.attrs): null},${children?children:null})`
    console.log(code)
    return code
}

