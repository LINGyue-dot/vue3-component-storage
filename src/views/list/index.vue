<template>
	<div class="list-container">
		<InfinteList :list-data="data" :estimated-item-size="100" />
	</div>
</template>
<script lang="ts" setup>
import faker from "faker";
import { nextTick, onMounted, ref } from "@vue/runtime-core";
import InfinteList from "@/components/list/InfinteList.vue";

const data = ref<{ value: string; id: number }[]>([]);

for (let i = 0; i < 1000; i++) {
	data.value.push({
		value: faker.lorem.sentences(),
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
