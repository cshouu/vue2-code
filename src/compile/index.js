export function compilerToFunction(el){
    console.log(el)
    let ast = parseHTML(el)
}

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` //标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //标签名称<span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`) //开头标签<div
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*`) //结束标签</div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const startTagClose = /^\s*(\/?)>/ //开始标签结尾
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g //{{}}
function start(tagName, atts){
    console.log('start()',tagName,atts)
}
function charts(text){
    console.log('charts(text)',text)
}
function end(tag){
    console.log('end(tag)',tag)
}
function parseHTML(html){
    // <div id="app">hello {{msg}}</div>
    while(html){
        //判断标签
        let textEnd = html.indexOf('<')
        if(textEnd === 0){ //是标签
            //开始标签
            const startTagMatch = parseStartTag()
            if (startTagMatch){
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            //结束标签
            let endTagMatch = html.match(endTag)
            if(endTagMatch){
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
            }
        }
        //文本
        let text
        if(textEnd > 0){
            console.log(textEnd)
            text = html.substring(0,textEnd)
            console.log(text,html)
        }
        if(text){
            advance(text.length)
            charts(text)
            // break
        }
    }

    function parseStartTag(){
        const start = html.match(startTagOpen)
        console.log(start)
        if(start){
            let match = {
                tagName: start[1],
                attrs: []
            }
            //删除开始标签
            advance(start[0].length)
            //属性
            let attr
            let end
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
                console.log(attr)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
            }
            if(end){
                console.log(end)
                advance(end[0].length)
                console.log(match)
                return match
            }
        }
    }
    function advance(n){
        html = html.substring(n)
        console.log(html)
    }
}

