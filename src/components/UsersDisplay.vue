<template>
	<div v-if="status === 'loading'">
		<h1>Loading</h1>
	</div>

	<section v-else class="users">
		<div v-for="allUser in allUsers" :key="allUser.id" class="user">
			<span class="add" @click="addFriend(allUser)"></span>
			<span class="user-profile-pic">
				<img :src="allUser.avatarUrl" :alt="allUser.username" />
			</span>
			<router-link :to="'/profile/' + allUser.id">
				<p>{{ allUser.username }}</p>
			</router-link>
		</div>
	</section>
</template>

<script>
	import { mapState, mapActions, mapMutations } from 'vuex'
	export default {
		props: ['id'],
		name: 'DisplayUsers',
		data() {
			return {}
		},

		methods: {
			...mapMutations(['setModal', 'setShowModal']),
			addFriend(newFriend) {
				let modalContent = {
					modalText:
						'Do you want to add ' + newFriend.username + ' as a friend?',
					modalTitle: 'Add a friend!',
					modalFunc: 'addNewFriend',
					modalData: newFriend
				}
				this.setShowModal(true)
				this.setModal(modalContent)
			}
		},

		computed: {
			...mapState(['allUsers', 'user', 'status']),
			...mapActions(['addNewFriend'])
		},

		mounted() {
			this.$store.dispatch('allUsers')
		}
	}
</script>

<style lang="scss">
	.users {
		width: 20%;

		.user {
			position: relative;
			display: flex;
			flex-direction: row;
			padding: 1em 0;
			margin: 10px 0px;
			width: 100%;
			box-shadow: 4px 5px 8px rgba(104, 103, 103, 0.133);
			text-align: center;

			a {
				width: 50%;
			}
			p {
				text-align: center;
				font-size: 0.8em;
				font-weight: 500;
			}
			.user-profile-pic {
				display: block;
				position: relative;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;

				img {
					position: absolute;
					width: 100%;
					left: 0;
				}
			}

			.add {
				cursor: pointer;
				display: block;
				position: absolute;
				right: -10%;
				border-radius: 50%;
				width: 50px;
				height: 50px;
				background-color: transparent;
				border: 1px solid rgb(209, 209, 209);
				transition: all 0.3s ease-out;

				&:hover {
					background-color: rgb(209, 209, 209);
					transform: scale(1.2);
				}

				&::before,
				&::after {
					content: '';
					height: 3px;
					width: 15px;
					background-color: gray;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					transition: all 0.3s ease-out;
				}

				&::after {
					transform: translate(-50%, -50%) rotate(90deg);
				}
			}
		}
	}
</style>
