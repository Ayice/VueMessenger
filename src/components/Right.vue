<template>
	<section class="right-section">
		<TodoList />
		<DoneList />
	</section>
</template>

<script>
	// import { eventBus } from '../main'
	// import TodoItem from './TodoItem'
	import DoneList from './DoneList'
	import TodoList from './TodoList'

	export default {
		name: 'RightSection',
		components: { DoneList, TodoList },

		methods: {}
	}
</script>

<style lang="scss">
	.right-section {
		color: #fff;
		background-color: #42b983;
	}
</style>