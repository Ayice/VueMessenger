<template>
	<div class="friends">
		<p>This is your friendlist</p>

		<div class="friend" v-for="friend in friends" :key="friend.id">
			<router-link :to="'/profile/' + friend.id">{{friend.username}} | {{friend.email}}</router-link>

			<span v-if="remove" class="remove" @click="removeFriend(friend.id)">X</span>
			<span v-else class="add" @click="addToChatroom(friend.id)">+</span>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'Friends',
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

<style lang="scss" scoped>
	.friend {
		align-items: center;
		display: flex;
		flex-direction: row;

		a {
			margin: 0.5em 0;
			width: 80%;
		}

		.add {
			margin-left: auto;
		}
	}
</style>
