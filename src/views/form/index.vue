<template>
	<div class="content">
		<ValidForm @form-submit="formSubmit">
			<div>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label"
						>Email address</label
					>
					<ValidInput :rules="emialRules" v-model="email" type="text" />
				</div>
				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">Password</label>
					<ValidInput :rules="passwordRules" v-model="password" type="text" />
				</div>
			</div>
			<template #submit
				><button type="submit" class="btn btn-primary">Submit</button></template
			>
		</ValidForm>
	</div>
</template>
<script lang="ts" setup>
import { ValidRuleProp } from "@/components/form/ValidInput.vue";
import { ref } from "@vue/reactivity";
import ValidInput from "../../components/form/ValidInput.vue";
import ValidForm from "@/components/form/ValidForm.vue";

const emialRules: ValidRuleProp = [
	{
		type: "required",
		message: "该字段必填",
	},
	{
		type: "email",
		message: "不是个有效的邮箱地址",
	},
];
const passwordRules: ValidRuleProp = [
	{ type: "required", message: "该字段必填" },
];

const email = ref();
const password = ref();
const formSubmit = (val: boolean) => {
	console.log(val);
};
</script>
<style scoped>
.content {
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
	padding: 10vw;
}
</style>
