<template>
	<section class="left-section">
		<Chatrooms>
			<template #title> <h1 v-if="user">Pick a chatroom!</h1></template>
		</Chatrooms>
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
	.left-chatroom-container {
		background-color: #eeeded5e;
	}
	.left-section {
		display: flex;
		flex-direction: column;
		align-items: center;

		.left-chatroom-container {
			width: 60%;
		}
	}
</style>
