<template>
	<div class="list-container">
		<InfinteList :list-data="data" :item-size="50" />
	</div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref } from "@vue/runtime-core";
import InfinteList from "@/components/list/InfinteList.vue";

const data = ref<{ value: string; id: number }[]>([]);

for (let i = 0; i < 100000; i++) {
	data.value.push({
		value: "This is No " + i,
		id: i,
	});
}
</script>
<style scoped>
.list-container {
	width: 100vw;
	height: 100vh;
}
</style>
