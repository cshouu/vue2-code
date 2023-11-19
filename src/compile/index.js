import {parseHTML} from "./parseAst";
import {generate} from "./generate";

export function compilerToFunction(el){
    // console.log(el)
    //html翻译成ast数据结构
    let ast = parseHTML(el)
    // console.log(ast)
    //ast变成render函数字符串
    let code=generate(ast)
    //render字符串变成函数
    let render=new Function(`with(this){return ${code}}`)
    // console.log('render',render)
    return render
}
