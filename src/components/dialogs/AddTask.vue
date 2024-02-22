<template>
	<el-dialog 
		v-model="usefullStore.toggle"
		:title="usefullStore.editToggle ? 'Edit a new task' : `Add a new task`"
		width="500"
		:before-close="handleClose" 
		>
		<el-form 
			label-position="top" 
			name="form" 
			ref="form"
			:model="todo"
			:rules="rulesList"
			>
			<el-form-item label="Title" prop="title">
				<el-input type="text" placeholder="Enter a title" v-model="todo.title" @keypress.enter="add(form)"/>
			</el-form-item>
			<el-form-item label="Text" prop="text">
				<el-input type="text" placeholder="Enter a text" v-model="todo.text" @keypress.enter="add(form)"/>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="handleClose">Cancel</el-button>
				<el-button type="primary"  @click="add(form)">
					Confirm
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	import { ref, computed, Ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useUsefull } from '../../stores/usefull'
	const usefullStore = useUsefull()
	import { taskStore } from '../../stores/task'
	import { ElMessage, FormInstance } from 'element-plus'
	const { editToggle } = storeToRefs(usefullStore)
	const store = taskStore()
	const form = ref()

	interface TodoDto {
		title:string,
		text:string
	}
	interface RuleDto  {
		title:object[],
		text:object[]
	}
	
	const todo: Ref<TodoDto> = ref({
		title:'',
		text:''
	})
	
	const rules:Ref<RuleDto> = ref({
		title: [{ required: true, message: 'No task name entered!', trigger: 'blur' }],
		text: [{ required: true, message: 'No task text entered!', trigger: 'blur' }]
	})
	const add = async (formEl: FormInstance | undefined) => {
		if (!formEl) return
		await formEl.validate((valid) => {
			if (valid) {
				store.add_task(todo.value)
				todo.value = {
					title:'',
					text:''
				}
				handleClose()

			} else {
			ElMessage.warning('Maydonlarni to`ldiring!!')
				console.clear()
			}
		})
		console.log(todo.value);
	}
	const handleClose = () => {
		usefullStore.setToggle(false)
	}
	const rulesList = computed(() => {
	let res = {...rules.value}

	return {...res}
	})
	
	
</script>

<style>

</style>