<template >
	<div v-if="user !== null">
		<ChatroomShow v-for="chatroom in chatrooms" :key="chatroom.id" :chatroom="chatroom" />
		<Form />
	</div>
</template>

<script>
	// import { db } from '../firebase/firebase'
	import { mapState, mapActions } from 'vuex'

	import Form from './Form'
	import ChatroomShow from './ChatRoomShow'

	export default {
		name: 'Chatrooms',
		components: { ChatroomShow, Form },
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