# component-storage





## form 表单 `/form`

### 核心思路

form 内包含 input

input：接收传入的规则，当 blur 时候对 input 内的内容进行判断是否满足规则，不满足的话就显示错误信息

form：用插槽接纳 input ，提交时候需要验证插槽内每个 input 是否满足规则。

### 主要问题

* form 组件如何验证每个 input 的是否满足规则

  利用 mitt 库完成 on emit 的发布订阅者模式，当 input 组件创建时候就将验证函数 emit 给 form ，form 接受所有的验证函数。这样就可以验证每个 input 是否满足规则







## 列表渲染 `/list`



### 主要问题

假设当前有 10w 条数据，如果进行一次性直接渲染那么就会造成卡顿

### 时间片进行渲染

> 利用 JS 事件循环，DOM 渲染的时机是在微任务之后宏任务之前，也就是说每执行完一个宏任务就会去进行 DOM 渲染，所以我们只需要在宏任务时候进行一部分的渲染，渲染完成之后再添加同样的宏任务（递归完成）。
>
> 这样就不会卡死（不对用户触发的事件进行响应）

```js
const timerRender = () => {
	let ul = document.getElementById("content");

	// 10w 条数据
	let total = 100000;
	// 每次渲染 30 条
	let pageCount = 30;
	function loop(curTotal: number, curIndex: number) {
		if (curTotal <= 0) {
			return false;
		}
		setTimeout(() => {
			//
			for (let i = 0; i < pageCount; i++) {
				let li = document.createElement("li");
				li.innerText = curIndex + i + " : " + i;
				ul?.appendChild(li);
			}
			loop(curTotal - pageCount, curIndex + pageCount);
		}, 0);
	}
	loop(total, 0);
};
```





**使用 `requestAnimationFrame` 进行优化** （temp）（为什么）

>  `requestAnimationFrame`  ：要求浏览器在下次重绘之前调用指定的回调函数。即屏幕刷新多少次回调函数执行多少次。当该页面不激活时候就自动停止调用

> 即在重绘之前调用该函数

```js
const timerRenderAuto = () => {
	let ul = document.getElementById("content");

	// 10w 条数据
	let total = 100000;
	// 每次渲染 30 条
	let pageCount = 30;
	function loop(curTotal: number, curIndex: number) {
		if (curTotal <= 0) {
			return false;
		}
		window.requestAnimationFrame(function () {
			for (let i = 0; i < pageCount; i++) {
				let li = document.createElement("li");
				li.innerText = curIndex + i + " : " + i;
				ul?.appendChild(li);
			}
			loop(curTotal - pageCount, curIndex + pageCount);
		});
	}
	loop(total, 0);
};
```



### 虚拟列表进行渲染

本质就是渲染可视区域的 item ，将其余的 item 删除。

```html
	<div class="infinite-list-container" @scroll="">
		<div class="infinite-list-phantom"></div> // 为全列表高度，用于撑起滚动条 设置 absoult 与 z-index = -1
		<div class="infinite-list"></div> // 设置 absolute 在 infinite-list-phantom 之上
	</div>
```

* 每个 item 高度固定

  监听滚动事件，设置高度为显示区域的高度以及距离上方的高度。利用 `slice` 对数据进行切片，获取此位置需要渲染的索引，后利用 `transform:translateY()` 对已渲染的列表进行偏移到可视区域即可。

  此时 `start= Math.floor(scrollTop/itemSize)` `end=start+visibleCount`





**每个 item 高度不固定**

以预估高度暂时替换，同时对每个 item 记录下渲染之后的真实的 top height bottom 等





















# Refrence

* https://juejin.cn/post/6844903938894872589
* https://juejin.cn/post/6844903982742110216
* 

