vue2机制学习

编写vue2 js机制代码，
通过rollup打包，
通过rollup-plugin-babel编译代码到目标环境

index.js定义Vue构造函数

init.js、initState.js处理传入参数对象

observer通过Object.defineProperty()对data对象的每一个属性设置getter、setter
