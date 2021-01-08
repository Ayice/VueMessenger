<template>
	<div v-if="user !== null" class="left-chatroom-container">
		<slot name="title"></slot>

		<ChatroomShow
			v-for="chatroom in chatrooms"
			:key="chatroom.id"
			:chatroom="chatroom"
		/>
		<div class="button-container">
			<button
				class="create-chat-button"
				@click="createNewChatroom = !createNewChatroom"
			>
				Create new Chatroom
			</button>
		</div>
		<transition name="slide-down">
			<NewChatroom v-if="createNewChatroom" />
		</transition>
	</div>
</template>

<script>
	// import { db } from '../firebase/firebase'
	import NewChatroom from './NewChatroom'
	import { mapState, mapActions } from 'vuex'

	import ChatroomShow from './ChatRoomShow'

	export default {
		name: 'Chatrooms',
		components: { ChatroomShow, NewChatroom },
		data() {
			return {
				createNewChatroom: false
			}
		},

		methods: {
			...mapActions(['getChatrooms'])
		},

		computed: {
			newChatroom: {
				get() {
					return this.$store.state.newChatroom
				},
				set(value) {
					this.$store.commit('setNewChatroom', value)
				}
			},

			...mapState(['chatrooms', 'user'])
		},

		mounted() {
			if (this.user) {
				this.getChatrooms()
			}
		}
	}
</script>

<style lang="scss">
	.button-container {
		display: flex;
		justify-content: flex-start;
	}
	.left-chatroom-container {
		border-radius: 3px;
		width: 100%;
		margin-top: 12px;
		padding: 6px;
	}
	.create-chat-button {
		margin-top: 24px;
	}
	.slide-down-enter-active {
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.slide-down-enter,
	.slide-down-leave {
		transform: translateY(-20px);
	}
</style>
