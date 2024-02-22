<template>
	<div class="edit">
		<div class="container">
			<head-part/>
			<el-breadcrumb :separator-icon="ArrowRight">
					<el-breadcrumb-item :to="{ path: '/' }">Homepage</el-breadcrumb-item>
					<el-breadcrumb-item>Edit</el-breadcrumb-item>
				</el-breadcrumb>
					<div class="edit__card">
						<div class="edit__title">
							Edit task
						</div>
						<div class="home__card-all">
							<el-form 
								label-position="top" 
								name="form" 
								ref="form"
								:model="todo"
								:rules="rulesList"
								>
								<el-form-item prop="status">
									<el-checkbox label="Complete"  v-model="todo.status" @keypress.enter="save(form)"></el-checkbox>
								</el-form-item>
								<el-form-item label="Title"  prop="title">
									<el-input type="text" placeholder="Enter a title" v-model="todo.title" @keypress.enter="save(form)"/>
								</el-form-item>
								<el-form-item label="Text" prop="text">
									<el-input type="text" placeholder="Enter a text" v-model="todo.text" @keypress.enter="save(form)"/>
								</el-form-item>
							</el-form>
							<div class="edit__action">
									<el-button type="warning" plain @click="cancel">
										<el-icon>
											<Close/>
										</el-icon>
										Cancel
									</el-button>
									<el-button @click="setDeleteToggle(true)" type="danger" plain >
										<el-icon>
											<Delete/>
										</el-icon>
										Delete
									</el-button>
							<el-button type="success" @click="save(form)">
								<el-icon><Check/></el-icon>
								Save
							</el-button>
							</div>
						</div>
					</div>
				<delete-task/>
				<AddTask/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import HeadPart from '@/components/HeadPart.vue'
	import { ref,onMounted,computed, Ref } from 'vue';
	import { taskStore } from '../stores/task'
	import { useUsefull } from '../stores/usefull'
	import DeleteTask from './dialogs/DeleteTask.vue'
	import AddTask from './dialogs/AddTask.vue'
	import { ArrowRight } from '@element-plus/icons-vue'
	import {useRouter,useRoute} from "vue-router";
	import { ElMessage, FormInstance } from 'element-plus'
	const router = useRouter()
	const route = useRoute()
	const form:any = ref()
	const usefullStore = useUsefull()
  	const {setDeleteToggle} = usefullStore
	const store = taskStore()

	interface RuleDto  {
		title:object[],
		text:object[]
	}
	interface TodoDto {
		status:boolean,
		title:string,
		text:string
	}
	const todo:Ref<TodoDto> = ref({
		title:'',
		text:'',
		status:false
	})

	const rules:Ref<RuleDto> = ref({
		title: [{ required: true, message: 'No task name entered!', trigger: 'blur' }],
		text: [{ required: true, message: 'No task text entered!', trigger: 'blur' }],
		status: [{ required: true, message: 'No task status entered!', trigger: 'blur' }]
	})
	

	const cancel = () => {
		router.push('/')
	}
	const rulesList = computed(() => {
		let res = {...rules.value}
		return {...res}
	})

	const save = async (formEl: FormInstance | undefined) => {
		console.log(formEl);
		if (!formEl) return
		await formEl.validate((valid) => {
			if (valid) {
				console.log("value",todo.value);
				store.update_task(todo.value)
				router.push('/')
			} else {
			ElMessage.warning('Maydonlarni to`ldiring!!')
				console.clear()
			}
		})
	}
  	onMounted(async() => {
		let res = await store.get_one_task(route.params.id)
		todo.value = {...res.data}
	})
</script>

<style lang="scss">
	@import '@/assets/style/edit.scss';
</style>