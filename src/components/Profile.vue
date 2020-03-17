<template>
	<div v-if="userProfile === null">
		<h1>Loading</h1>
	</div>

	<section class="profile" v-else>
		<div class="profile-pic">
			<img src alt="profile pic" />
		</div>

		<div class="profile-info">
			<h1>{{userProfile.name}}</h1>
			<h2>aka. {{userProfile.username}}</h2>

			<Friends v-if="userProfile.id === user.id" />
		</div>
		<DisplayUsers />
		<Chatrooms class="chatrooms" v-if="userProfile.id === user.id" />
	</section>
</template>

<script>
	import { db } from '../firebase/firebase'
	import { mapState } from 'vuex'
	import Chatrooms from './ChatRooms'
	import DisplayUsers from './UsersDisplay'
	import Friends from './Friends'

	export default {
		name: 'Profile',
		props: ['id'],
		components: { Chatrooms, DisplayUsers, Friends },
		data() {
			return {
				userProfile: null
			}
		},
		methods: {
			fetchUser() {
				db.collection('users')
					.doc(this.id)
					.get()
					.then(user => {
						this.userProfile = user.data()
					})
			}
		},
		computed: {
			...mapState(['user'])
		},
		watch: {
			id() {
				this.fetchUser()
			}
		},
		mounted() {
			this.fetchUser()
		}
	}
</script>

<style lang="scss" scoped>
	.profile {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;

		&-pic {
			width: 20%;

			img {
				width: 75%;
				height: auto;
			}
		}

		&-info {
			width: 50%;
		}

		.users {
			width: 20%;
		}
	}
</style>