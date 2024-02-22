<template>
	<div class="head">
		<div class="home__title">
			To Do List
		</div>
		<div class="home__btn">
			<el-button @click="setToggle(true)">+</el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useUsefull } from '../stores/usefull'
	const usefullStore = useUsefull()
  	const {setToggle} = usefullStore
</script>

<style lang="scss">
@import '@/assets/style/home.scss';
</style>