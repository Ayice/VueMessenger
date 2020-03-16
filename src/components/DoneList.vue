<template>
	<transition name="list">
		<section v-show="doneTodos.length > 0">
			<h1>Done</h1>
			<transition-group name="list" tag="span" class="done-list">
				<DoneItem v-for="doneTodo in doneTodos" :key="doneTodo.id" :doneTodo="doneTodo" />
			</transition-group>
		</section>
	</transition>
</template>

<script>
	import { eventBus } from '../main'
	import DoneItem from './DoneItem'
	export default {
		components: {
			DoneItem
		},
		name: 'DoneList',
		data() {
			return {
				doneTodos: [],
				newDone: {}
			}
		},
		created() {
			eventBus.$on('addToDone', data => {
				this.newDone = {
					...data,
					id:
						this.doneTodos.length > 0
							? this.doneTodos[this.doneTodos.length - 1].id + 1
							: 0
				}
				this.doneTodos.push(this.newDone)
			})
		}
	}
</script>

<style lang="scss">
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
	.done-list {
		padding: 0 1em;
		display: flex;
		flex-flow: row wrap;

		h1 {
			width: 100%;
		}
	}
</style>