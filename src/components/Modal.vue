<template>
	<div class="modal">
		<div class="modal-header">
			<h3>{{title}}</h3>
		</div>

		<div class="modal-body">
			<p>{{text}}</p>
		</div>

		<div class="modal-footer">
			<button @click="handleClick(action, data)">Confirm</button>
		</div>
	</div>
</template>

<script>
	// import { mapActions } from 'vuex'
	export default {
		props: ['title', 'text', 'data', 'action'],
		name: 'Modal',
		computed: {},
		methods: {
			handleClick(action, data) {
				this.$store.dispatch(action, data)
			}
		}
	}
</script>

<style>
</style>