vue2机制学习

编写vue2 js机制代码，
通过rollup打包，rollup.config.js是配置文件：

1）通过rollup-plugin-babel编译代码到目标环境

2）通过rollup-plugin-serve开启一个静态服务器，便于调试


index.js定义Vue构造函数

initState.js处理传入的参数对象：

1）initData()：observer通过Object.defineProperty()对data对象的每一个属性设置getter、setter，并把data代理到Vue实例上

compile编译模板为ast数据结构
