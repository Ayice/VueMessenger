<template>
	<section class="profile" v-if="userProfile !== null">
		<div class="profile-pic">
			<img :src="userProfile.avatarUrl" alt="profile pic" />
		</div>

		<div class="profile-info">
			<span>
				<h1>{{ userProfile.name }}</h1>
				<h2>aka. {{ userProfile.username }}</h2>
				<router-link :to="'/update-profile/' + user.id"
					>Update your profile</router-link
				>
			</span>
			<Friends v-if="userProfile.id === user.id" :remove="true" />
		</div>
		<div class="right">
			<DisplayUsers v-on:showModal="showModal = true" />
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

<style lang="scss">
	.right {
		width: 30%;
	}

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
			margin-top: 20px;

			img {
				width: 90%;
				height: auto;
			}
		}

		&-info {
			display: flex;
			flex-direction: column;
			width: 50%;
			height: fit-content;
			align-items: center;
			flex-wrap: wrap;

			& > span {
				width: 75%;

				h1 {
					margin-bottom: 0;
				}
				h2 {
					margin-top: 0;
				}
			}

			.friends {
				width: 75%;
			}
			.friend {
				width: 100%;
			}
		}

		.users {
			width: 100%;
		}
	}
</style>
