# component-storage





## form 表单 `/form`

### 核心思路

form 内包含 input

input：接收传入的规则，当 blur 时候对 input 内的内容进行判断是否满足规则，不满足的话就显示错误信息

form：用插槽接纳 input ，提交时候需要验证插槽内每个 input 是否满足规则。

### 主要问题

* form 组件如何验证每个 input 的是否满足规则

  利用 mitt 库完成 on emit 的发布订阅者模式，当 input 组件创建时候就将验证函数 emit 给 form ，form 接受所有的验证函数。这样就可以验证每个 input 是否满足规则

