<template>
	<transition name="list">
		<div class="todo-list" v-show="todoList.length > 0">
			<h1>Todos</h1>
			<transition-group class="todo-list" name="list" tag="span">
				<TodoItem v-for="todo in todoList" :todo="todo" :key="todo.id" />
			</transition-group>
		</div>
	</transition>
</template>

<script>
	import TodoItem from './TodoItem'
	import { eventBus } from '../main'

	export default {
		components: { TodoItem },
		name: 'TodoList',
		data() {
			return {
				newTodo: {
					location: '',
					captions: ''
				},
				todoList: [{ id: 1, location: 'Here ', caption: 'HEJ HEJ HEJ HEJ' }]
			}
		},
		created() {
			eventBus.$on('addTodo', data => {
				this.newTodo = {
					...data,
					id:
						this.todoList.length > 0
							? this.todoList[this.todoList.length - 1].id + 1
							: 0
				}
				this.todoList.push(this.newTodo)
			}),
				eventBus.$on('doneTodo', data => {
					this.todoList.splice(this.todoList.indexOf(data), 1)
					setTimeout(() => {
						eventBus.$emit('addToDone', data)
					}, 1000)
				})
		}
	}
</script>

<style lang="scss">
	.todo-list {
		padding: 0 1em;
		display: flex;
		flex-flow: row wrap;

		h1 {
			width: 100%;
		}
	}

	.list-item {
		display: inline-block;
		margin-right: 10px;
	}
	.list-enter-active,
	.list-leave-active {
		transition: all 1s;
	}
	.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(30px);
	}
</style>
