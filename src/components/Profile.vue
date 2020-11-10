<template>
	<section class="profile" v-if="userProfile !== null">
		<div class="info-friends-container">
			<div class="profile-info">
				<div class="profile-pic">
					<img :src="userProfile.avatarUrl" alt="profile pic" />
				</div>
				<div v-if="userProfile.id === user.id" class="profile-edit">
					<router-link :to="'/update-profile/' + user.id"
						>Update your profile</router-link
					>
				</div>
				<span>
					<h1>{{ userProfile.name }}</h1>
					<h2>aka. {{ userProfile.username }}</h2>
					<div v-if="userProfile.id !== user.id">
						<router-link :to="'/user-chat/' + userProfile.id">
							Start chat</router-link
						>
					</div>
				</span>
			</div>
			<div class="friends-section">
				<Friends v-if="userProfile.id === user.id" :remove="true" />
			</div>
		</div>

		<div class="right">
			<DisplayUsers v-on:showModal="showModal = true" />

			<Chatrooms class="chatrooms" v-if="userProfile.id === user.id">
				<template v-slot:title>
					<p class="title">Chatrooms you're a member of</p>
				</template>
			</Chatrooms>
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
	.info-friends-container {
		margin-right: 12px;
		width: 50%;
	}

	.friends-section {
		border-radius: 3px;
		background-color: #eeeded5e;
		padding: 24px;
		display: flex;
		height: fit-content;
		flex-wrap: wrap;
		.friends {
			width: 100%;
		}
		.friend {
			padding: 0;
			width: 100%;
		}
	}
	.right {
		width: 30%;
	}

	.blur {
		filter: blur(20px);
	}

	.profile {
		padding: 0 2%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;

		&-edit {
			width: 50%;
			align-self: flex-end;
			justify-content: flex-end;
			display: flex;
		}

		&-pic {
			width: 50%;

			img {
				width: 90%;
				height: auto;
			}
		}

		&-info {
			margin-bottom: 12px;
			background-color: #eeeded5e;
			padding: 24px;
			border-radius: 3px;
			display: flex;
			height: fit-content;
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
		}

		.users {
			border-radius: 3px;
			background-color: #eeeded5e;
			padding: 6px;
			width: 100%;
		}
	}
</style>
