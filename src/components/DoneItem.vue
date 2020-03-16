<template>
	<div class="done">
		<h1>{{ doneTodo.location }}</h1>
		<p>{{ doneTodo.caption }}</p>
	</div>
</template>

<script>
	// import { eventBus } from '../main'
	export default {
		props: {
			doneTodo: Object
		},
		name: 'doneTodo'
	}
</script>

<style lang="scss">
	.done {
		border: 1px solid #fff;
		border-radius: 5px;
		padding: 0 1em;
		margin: 1em;
	}
</style>