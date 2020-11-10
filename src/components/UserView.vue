<template>
	<router-link :to="'/profile/' + user.id" tag="div" class="friend">
		<span class="user-profile-pic">
			<img :src="user.avatarUrl" :alt="user.username" />
		</span>
		<p>{{ user.username }}</p>

		<span
			class="remove"
			@click.prevent="
				chatroom ? addToChatModal(user) : addFriend(user),
					remove ? removeFriendModal(user) : null
			"
		>
			<button v-if="remove">Remove friend</button>
			<button v-else>Add friend</button>
		</span>

		<span class="add"></span>
	</router-link>
</template>

<script>
	import { mapMutations, mapActions } from 'vuex'
	export default {
		name: 'UserView',
		props: ['user', 'remove', 'chatroom'],
		methods: {
			...mapActions(['addToChatroom', 'addNewFriend', 'removeFriend']),
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
			},

			addToChatModal(user) {
				let modalContent = {
					modalText:
						'Do you want to add ' + user.username + ' to the chatroom?',
					modalTitle: 'Add to chatroom!',
					modalFunc: 'addToChatroom',
					modalData: user
				}
				this.setShowModal(true)
				this.setModal(modalContent)
			},

			removeFriendModal(user) {
				let modalContent = {
					modalText: 'Do you want to remove ' + user.username + ' as a friend?',
					modalTitle: 'Remove a friend!',
					modalFunc: 'removeFriend',
					modalData: user
				}
				this.setShowModal(true)
				this.setModal(modalContent)
			}
		}
	}
</script>

<style lang="scss">
	.friend {
		position: relative;
		cursor: pointer;
		width: 60%;
		align-items: center;
		display: flex;
		flex-direction: row;
		border-radius: 5px;
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

		&:hover {
			box-shadow: 2px 5px 6px rgba(129, 129, 129, 0.4);
		}

		.user-profile-pic {
			display: block;
			position: relative;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			overflow: hidden;
			margin: 0.5em 1em 0.5em 0;

			img {
				position: absolute;
				width: 100%;
				left: 0;
			}
		}

		p {
			margin: 0;
			width: 70%;
		}

		.add {
			margin-left: auto;
		}

		.remove {
			cursor: pointer;
			display: flex;
			align-items: center;
			position: absolute;
			right: 2%;
			height: 100%;
			z-index: 10;

			button {
				cursor: pointer;
				width: auto;
				font-weight: 400;
				font-size: 0.7em;
			}
		}
	}
</style>
