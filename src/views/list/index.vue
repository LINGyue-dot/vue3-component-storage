<template>
	<div class="infinite-list-container" @scroll="">
		<div class="infinite-list-phantom"></div>
		<div class="infinite-list"></div>
	</div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted } from "@vue/runtime-core";
</script>
<style scoped></style>
