<template>
	<el-dialog 
		v-model="usefullStore.deleteToggle" 
		title="Delete task" 
		width="500"
		:before-close="handleClose" 
		>
		
		<div class="home__delete">
			Are you sure you want to delete the task?
			
		</div>
		
		<template #footer>
			<div class="dialog-footer" >
				<el-button @click="handleClose">Cancel</el-button>
				<el-button type="primary"  @click="detele()">
					Confirm
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	const props = defineProps(['id'])
	import { taskStore } from '../../stores/task'
	import { useUsefull } from '../../stores/usefull'
	const usefullStore = useUsefull()

	const store = taskStore()

	const handleClose = () => {
		usefullStore.setDeleteToggle(false)
	}
	const detele = () => {
		console.log(props.id);
		store.delete_task(props.id)
		handleClose()
	}
	
</script>

<style>

</style>