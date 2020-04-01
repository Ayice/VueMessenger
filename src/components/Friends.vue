<template>
	<div class="friends">
		<p>This is your friendlist</p>
		<UserView
			v-for="friend in friends"
			:key="friend.id"
			:chatroom="false"
			:remove="true"
			:user="friend"
		/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import UserView from './UserView'
	export default {
		name: 'Friends',
		components: { UserView },
		props: ['remove'],
		data() {
			return {}
		},
		computed: mapState({
			friends: state => state.friends
		}),
		methods: mapActions(['removeFriend', 'addToChatroom'])
	}
</script>

<style lang="scss">
	.friends {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
