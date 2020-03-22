<template>
	<section class="left-section">
		<h1 v-if="user">Pick a chatroom!</h1>
		<h1 v-else>Log in</h1>
		<Chatrooms />
		<Login />
	</section>
</template>

<script>
	import Chatrooms from './ChatRooms'
	import Login from './LogIn'
	import { mapState } from 'vuex'

	export default {
		components: {
			Chatrooms,
			Login
		},
		name: 'LeftSection',
		data() {
			return {}
		},
		computed: {
			...mapState(['user'])
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
