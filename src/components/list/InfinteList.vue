<template>
	<div
		ref="listRef"
		class="infinite-list-container"
		@scroll="scrollEvent($event)"
	>
		<div
			class="infinite-list-phantom"
			:style="{ height: listHeight + 'px' }"
		></div>
		<div class="infinite-list" :style="{ transform: getTransform + '' }">
			<div ref="itemRefs" class="infinite-list-item" v-for></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from "@vue/reactivity";

const props = defineProps({
	listData: {
		type: Array,
		default: () => [],
	},
	itemSize: {
		type: Number,
		default: 200,
	},
});

const listRef = ref();
const itemRefs = ref();
``
const scrollEvent = (e: Event) => {};
const listHeight = computed(() => 100);
const getTransform = computed(() => 1);
</script>
<style scoped></style>
