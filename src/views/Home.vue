<template>
	<div class="home">
		<div class="container">
			<head-part/>
      <tasks/>
      <add-task/>
		</div>
	</div>
	
</template>

<script setup lang="ts">
  
  import AddTask from '../components/dialogs/AddTask.vue'
  import Tasks from '../components/Tasks.vue'
  import HeadPart from '../components/HeadPart.vue'

</script>

<style lang="scss"> 
	@import '@/assets/style/home.scss';
</style>