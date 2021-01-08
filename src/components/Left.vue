<template>
	<section class="left-section">
		<Chatrooms>
			<template #title>
				<h3 v-if="user && chatrooms.length">Pick a chatroom!</h3>
				<h3 v-else-if="user && !chatrooms.length">
					You are not in any chatrooms yet. <br />
					Create one and add your friends!
				</h3>
			</template>
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
			...mapState(['user', 'chatrooms'])
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
