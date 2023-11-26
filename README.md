# vue2机制学习
编写vue2 js机制代码，
通过rollup打包，rollup.config.js是配置文件：
1. 通过rollup-plugin-babel编译代码到目标环境
2. 通过rollup-plugin-serve开启一个静态服务器，便于调试
## 整体流程
1. index.js，入口文件，定义Vue构造函数，调用init.js
2. init.js
   - callHook beforeCreate
   - vue实例参数初始化入口，**调用initState**
   - callHook created
   - 模板编译入口（**调用compile**）、挂载入口（**调用lifecycle**）
3. initState.js，初始化数据
   - initData()
     - 把data代理到Vue实例上
     - **调用响应式observer**
   - stateMixin 定义Vue原型链方法$nextTick()，调用utils nextTick()
4. lifecycle.js，生命周期
   - callHook beforeMount
   - new watcher
     - updateComponent函数：
       - **调用vnode.js**生成vnode
       - **调用patch.js**生成真实dom并更新到页面
     - 回调函数callHook updated
   - callHook mounted
   - callHook生命周期调用方法定义
5. patch.js
    - 生成真实dom并更新到页面
## 响应式
目录：observer
1. index.js 对象响应式
   - 通过Object.defineProperty()对data对象的每一个属性设置getter、setter
   - setter调用dep.depend()
   - setter调用dep.notify()
2. arr.js 数组响应式
   - 劫持修改数组内容的常用方法
   - 调用dep.notify()
2. dep.js、watcher.js
   - data中每个属性对应1个dep，每个Vue实例对应1个watcher，dep和watcher互相绑定，data中数据发生改变，watcher调用vm._update(vm._render())更新dom
## 模板编译
目录：compile
1. 将模板编译为ast数据结构
2. 将ast数据结构变成render函数
## vnode
目录：vnode
- 执行render函数，生成vnode
## 工具函数
目录：utils
- mergeOptions合并选项
- nextTick异步