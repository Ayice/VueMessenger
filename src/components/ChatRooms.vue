<template >
	<div v-if="user !== null">
		<ChatroomShow v-for="chatroom in chatrooms" :key="chatroom.id" :chatroom="chatroom" />
		<NewChatroom />
	</div>
</template>

<script>
	// import { db } from '../firebase/firebase'
	import { mapState, mapActions } from 'vuex'

	import NewChatroom from './NewChatroom'
	import ChatroomShow from './ChatRoomShow'

	export default {
		name: 'Chatrooms',
		components: { ChatroomShow, NewChatroom },
		data() {
			return {
				// chatrooms: [],
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

		// firestore: {
		// 	chatrooms: db.collection('chatrooms')
		// }
	}
</script>

<style>
</style>
