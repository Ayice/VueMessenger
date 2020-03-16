<template>
	<section class="left-section">
		<h1>Create Todos!</h1>
		<Chatrooms />
		<Login />
	</section>
</template>

<script>
	import Chatrooms from './ChatRooms'
	import Login from './LogIn'

	export default {
		components: {
			Chatrooms,
			Login
		},
		name: 'LeftSection',
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	.left-section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>