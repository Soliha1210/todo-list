<template>
<div>
	<el-tabs  v-model="activeName"  type="border-card" @tab-click="handleClick">
		<el-tab-pane label="All" name="all">
			<div class="home__card" v-for="task of tasks" :key="task">
				<div class="home__all">
					<div>
						<div :class="`home__name ${task?.status ==true ? 'completed': '' }` ">
							{{task?.title}}
						</div>
						<div class="home__text">
							{{task?.text}}
						</div>
					</div>
					<div v-if="task?.status" class="home__complete">
						<el-icon> <Select/></el-icon>
					</div>
				</div>
				
				<div class="home__action">
					<div class="home__edit">
						<router-link :to="`/${task?._id}`">
							<el-button type="warning" plain>
								<el-icon>
									<edit />
								</el-icon>
							</el-button>
						</router-link>

					</div>
					<div class="home__delete">
						<el-button @click="deleteTask(task?._id)" type="danger" plain >
							<el-icon>
								<Delete/>
							</el-icon>
						</el-button>
					</div>

				</div>
			</div>
			
		</el-tab-pane>
		<el-tab-pane label="Active" name="active">
			<div class="home__card" v-for="task of tasks" :key="task">
				<div class="home__all">
					<div>
						<div class="home__name">
							{{task?.title}}
						</div>
						<div class="home__text">
							{{task?.text}}
						</div>
					</div>
				</div>
				<div class="home__action">
					<div class="home__edit">
						<router-link :to="`/${task?._id}`">
							<el-button type="warning" plain>
								<el-icon>
									<edit />
								</el-icon>
							</el-button>
						</router-link>

					</div>
					<div class="home__delete">
						<el-button @click="deleteTask(task?._id)" type="danger" plain >
							<el-icon>
								<Delete/>
							</el-icon>
						</el-button>
					</div>

				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane label="Completed" name="completed">
			<div class="home__card" v-for="task of tasks" :key="task">
				<div class="home__all">
					<div>
						<div class="home__name">
							{{task?.title}}
						</div>
						<div class="home__text">
							{{task?.text}}
						</div>
					</div>
				</div>
				<div class="home__action">
					<div class="home__edit">
						<router-link :to="`/${task?._id}`">
							<el-button type="warning" plain>
								<el-icon>
									<edit />
								</el-icon>
							</el-button>
						</router-link>

					</div>
					<div class="home__delete">
						<el-button @click="deleteTask(task?._id)" type="danger" plain >
							<el-icon>
								<Delete/>
							</el-icon>
						</el-button>
					</div>

				</div>
			</div>
		</el-tab-pane>
	</el-tabs>
	<DeleteTask :id="id"/>
</div>
</template>

<script setup lang="ts">
	import { ref,onMounted } from 'vue';
  	import { storeToRefs } from 'pinia';
	import { taskStore } from '../stores/task'
	import { useUsefull } from '../stores/usefull'
	import DeleteTask from './dialogs/DeleteTask.vue'

	const id = ref('')
	
	const store = taskStore()
  	const {tasks} = storeToRefs(store)

	const usefullStore = useUsefull()
  	const {setDeleteToggle} = usefullStore
	const activeName = ref('all')



	const deleteTask =(_id:string) => {
		id.value = _id
		console.log(id.value);
		usefullStore.setDeleteToggle(true)
	}
	const handleClick = (tab:any) => {
		if (tab?.props?.name == 'completed') {
			store.get_task({status:true})
		} else if (tab?.props?.name == 'active') {
			store.get_task({status:false})
		}
		else {
			store.get_task({})
		}
}
  	onMounted(() => {
		handleClick({})
		
	})
</script>

<style>

</style>