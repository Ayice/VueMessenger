<template>
	<div v-if="user !== null" class="left-chatroom-container">
		<ChatroomShow
			v-for="chatroom in chatrooms"
			:key="chatroom.id"
			:chatroom="chatroom"
		/>

		<button @click="createNewChatroom = !createNewChatroom">
			Create new Chatroom
		</button>
		<transition name="slide-in">
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
				// chatrooms: [],
				createNewChatroom: false,
				inputs: [{ name: 'dfsa' }, { id: '' }]
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
	.slide-in-enter-active {
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.slide-in-enter,
	.slide-in-leave-to {
		transform: translateY(-20px);
	}
</style>
