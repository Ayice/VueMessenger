<template>
	<section class="profile" v-if="userProfile !== null">
		<div class="profile-pic" :class="showModal ? 'blur' : ''">
			<img :src="userProfile.avatarUrl" alt="profile pic" />
		</div>

		<div :class="showModal ? 'blur' : ''" class="profile-info">
			<h1>{{ userProfile.name }}</h1>
			<h2>aka. {{ userProfile.username }}</h2>
			<router-link :to="'/update-profile/' + user.id"
				>Update your profile</router-link
			>

			<Friends v-if="userProfile.id === user.id" :remove="true" />
		</div>
		<DisplayUsers v-on:showModal="showModal = true" />

		<div :class="showModal ? 'blur' : ''">
			<p>Chatrooms you're a member of</p>
			<Chatrooms class="chatrooms" v-if="userProfile.id === user.id" />
		</div>
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
				userProfile: null,
				showModal: false
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
	.blur {
		filter: blur(20px);
	}
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
