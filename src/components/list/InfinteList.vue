<template>
	<div ref="listRef" class="infinite-list-container" @scroll="scrollEvent">
		<div
			class="infinite-list-phantom"
			:style="{ height: listHeight + 'px' }"
		></div>
		<div class="infinite-list" :style="{ transform: getTransform }">
			<div
				:ref="setItemRef"
				ref="tempItem"
				class="infinite-list-item"
				v-for="item in visibleData"
				:key="item.id"
				:style="{
					// height: positions[item.id].height + 'px',
				}"
			>
				{{ item.value }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
interface PositionProp {
	index: number;
	top: number;
	bottom: number;
	height: number;
}
import { computed, ref } from "@vue/reactivity";
import { onMounted, onUpdated, PropType } from "@vue/runtime-core";

const props = defineProps({
	listData: {
		type: Array as PropType<{ value: string; id: number }[]>,
		default: () => [],
	},
	// 预估高度
	estimatedItemSize: {
		type: Number,
		default: () => 200,
	},
});

const listRef = ref<HTMLDivElement>();
const itemRefs = ref<HTMLDivElement[]>([]);
const tempItem = ref<HTMLDivElement>();
// refs array
const setItemRef = (el: HTMLDivElement) => {
	itemRefs.value?.push(el);
};

// 可视区域高度
const screenHeight = ref(0);
// 偏移量
const startOffset = ref(0);
// 其实索引
const start = ref(0);
// 结束索引
const end = ref<null | number>(null);
// 记录位置的数组
const positions = ref<PositionProp[]>([]);

// 列表总高度
const listHeight = computed(
	() => positions.value[positions.value.length - 1].bottom
);
// 偏移对应的 style
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`);
// 获取真实显示列表数据
const visibleData = computed(() =>
	props.listData.slice(
		start.value,
		Math.min(end.value as number, props.listData.length)
	)
);

const scrollEvent = (e: Event) => {
	// 当前滚动位置
	let scrollTop = listRef.value?.scrollTop as number;
	// 开始索引
	start.value = getStartIndex(scrollTop);
	// 结束索引
	end.value = getStartIndex(scrollTop + screenHeight.value);
	// 计算偏移量
	if (start.value >= 1) {
		// 上一个 bottom
		startOffset.value = positions.value[start.value - 1].bottom;
	} else {
		startOffset.value = 0;
	}
};

// 通过 scrollTop 寻找当前需要渲染列表的其实 index
const getStartIndex = (scrollTop = 0) => {
	// 找到第一个 bottom 大于 scrollTop 的 item
	let item = positions.value.find(i => i && i.bottom > scrollTop);
	return item?.index || 0;
};

// 利用预估值计算出预估的位置和高度
const initPosition = () => {
	positions.value = props.listData.map((item, index) => {
		return {
			index,
			height: props.estimatedItemSize,
			top: index * props.estimatedItemSize,
			bottom: (index + 1) * props.estimatedItemSize,
		};
	});
};
initPosition();

onMounted(() => {
	screenHeight.value = listRef.value?.clientHeight as number;
	// 开始索引
	start.value = getStartIndex();
	// 结束索引
	end.value = getStartIndex(screenHeight.value);
});

// 更新 DOM 之后记录下真实的 DOM 位置
onUpdated(() => {
	console.log("updated");
	let nodes = itemRefs.value;
	// console.log(nodes);
	// return;
	const node = tempItem.value as HTMLDivElement;

	let rect = node.getBoundingClientRect();
	let height = rect.height;
	console.log(node);
	let index = +node.id.slice(1);
	let oldHeight = positions.value[index].height;
	let dValue = oldHeight - height;

	// 如果存在差值
	if (dValue) {
		// 修正差值
		positions.value[index].bottom = positions.value[index].bottom - dValue;
		positions.value[index].height = height;

		// 修正下面的 DOM 的位置
		for (let k = index + 1; k < positions.value.length; k++) {
			positions.value[k].top = positions.value[k - 1].bottom;
			positions.value[k].bottom = positions.value[k].bottom - dValue;
		}
	}
	return;
	nodes?.forEach(node => {
		let rect = node.getBoundingClientRect();
		let height = rect.height;
		console.log(node);
		let index = +node.id.slice(1);
		let oldHeight = positions.value[index].height;
		let dValue = oldHeight - height;

		// 如果存在差值
		if (dValue) {
			// 修正差值
			positions.value[index].bottom = positions.value[index].bottom - dValue;
			positions.value[index].height = height;

			// 修正下面的 DOM 的位置
			for (let k = index + 1; k < positions.value.length; k++) {
				positions.value[k].top = positions.value[k - 1].bottom;
				positions.value[k].bottom = positions.value[k].bottom - dValue;
			}
		}
	});
});
</script>
<style scoped>
.infinite-list-container {
	height: 100%;
	overflow: auto;
	position: relative;
	-webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	z-index: -1;
}

.infinite-list {
	left: 0;
	right: 0;
	top: 0;
	position: absolute;
	text-align: center;
}

.infinite-list-item {
	padding: 10px;
	color: #555;
	box-sizing: border-box;
	border-bottom: 1px solid #999;
}
</style>
