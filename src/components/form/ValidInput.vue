<template>
	<input
		type="text"
		class="form-control is-invalid"
		id="validationServer05"
		aria-describedby="validationServer05Feedback"
		v-model="inputRef.val"
		@blur="validInput"
	/>
	<div
		v-if="inputRef.error"
		id="validationServer05Feedback"
		class="invalid-feedback"
	>
		{{ inputRef.message }}
	</div>
</template>
<script lang="ts" setup>
import { PropType, reactive, defineExpose } from "vue";
interface InputRuleProp {
	type: "required" | "email";
	message: string;
}
export type ValidRuleProp = InputRuleProp[];

const inputRef = reactive({
	val: "",
	error: false,
	message: "",
});

const props = defineProps({
	rules: Object as PropType<ValidRuleProp>,
});

// 验证函数
const validInput = () => {
	if (props.rules) {
		const allPassed = props.rules.every(rule => {
			let passed = true;
			inputRef.message = rule.message;
			switch (rule.type) {
				case "required":
					passed = inputRef.val.trim() !== "";
					break;
				case "email":
					passed = inputRef.val.includes("a");
				default:
					break;
			}
			return passed;
		});
		inputRef.error = !allPassed;
	}
};

defineExpose({
	validInput,
});
</script>
<style scoped></style>
