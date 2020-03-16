<template>
	<div class="todo">
		<h1>{{ todo.location }}</h1>
		<p>{{ todo.caption }}</p>

		<input type="checkbox" v-model="checked" :checked="checked" />
	</div>
</template>

<script>
	import { eventBus } from '../main'
	// import { eventBus } from '../main'
	export default {
		props: {
			todo: Object
		},
		name: 'TodoItem',
		data() {
			return {
				checked: false
			}
		},
		watch: {
			checked: function() {
				eventBus.$emit('doneTodo', this.todo)
			}
		}
	}
</script>

<style lang="scss">
	.todo {
		border: 1px solid #fff;
		border-radius: 5px;
		padding: 0 1em;
		margin: 1em;
	}
</style>