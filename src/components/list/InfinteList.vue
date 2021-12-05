<template>
	<div ref="listRef" class="infinite-list-container" @scroll="scrollEvent">
		<div
			class="infinite-list-phantom"
			:style="{ height: listHeight + 'px' }"
		></div>
		<div class="infinite-list" :style="{ transform: getTransform }">
			<div
				ref="itemRefs"
				class="infinite-list-item"
				v-for="item in visibleData"
				:key="item.id"
				:style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
			>
				{{ item.value }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from "@vue/reactivity";
import { onMounted, PropType } from "@vue/runtime-core";

const props = defineProps({
	listData: {
		type: Array as PropType<{ value: string; id: number }[]>,
		default: () => [],
	},
	itemSize: {
		type: Number,
		default: 200,
	},
});

const listRef = ref<HTMLDivElement>();
const itemRefs = ref<HTMLDivElement[]>();

// 可视区域高度
const screenHeight = ref(0);
// 偏移量
const startOffset = ref(0);
// 其实索引
const start = ref(0);
// 结束索引
const end = ref<null | number>(null);

// 列表总高度
const listHeight = computed(() => props.listData.length * props.itemSize);
// 可显示的列表项数
const visibleCount = computed(() =>
	Math.ceil(screenHeight.value / props.itemSize)
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
	console.log("scroll");
	// 当前滚动位置
	let scrollTop = listRef.value?.scrollTop as number;
	// 开始索引
	start.value = Math.floor(scrollTop / props.itemSize);
	// 结束索引
	end.value = start.value + visibleCount.value;
	console.log(scrollTop);
	// 偏移量
	startOffset.value = scrollTop - (scrollTop % props.itemSize);
};

onMounted(() => {
	screenHeight.value = listRef.value?.clientHeight as number;
	start.value = 0;
	end.value = start.value + visibleCount.value;
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
