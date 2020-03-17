<template>
	<div v-if="chatroom === null">
		<h1>Loading ..</h1>
	</div>
	<div v-else>
		<h1>{{ chatroom.name }}</h1>
		<ul v-for="message in messages" :key="message.id">
			<li :class="[message.senderId === user.id ? 'author' : 'receiver']">
				{{message.sender}} :
				{{message.message}}
			</li>
		</ul>
		<form @submit.prevent="sendMsg">
			<label for="message">Message</label>
			<input
				type="text"
				name="message"
				id="message"
				placeholder="Write your message here"
				v-model="message"
			/>

			<button type="submit">Send message</button>
		</form>
	</div>
</template>

<script>
	import { db } from '../firebase/firebase'
	import { mapState } from 'vuex'
	import firebase from 'firebase'

	export default {
		name: 'Chatroom',
		props: ['id'],
		data() {
			return {
				chatroom: null,
				messages: [],
				message: ''
			}
		},
		methods: {
			sendMsg() {
				db.collection('messages')
					.doc(this.$route.params.id)
					.collection('messages')
					.add({
						message: this.message,
						sender: this.$store.state.user.username,
						senderId: this.$store.state.user.id,
						createdAt: firebase.firestore.Timestamp.now()
					})
					.then(() => {
						this.message = ''
					})
			}
		},
		computed: {
			...mapState(['user'])
		},
		async mounted() {
			// let ids = []
			let chats = []
			await db
				.collection('chatrooms')
				.doc(this.$route.params.id)
				.get()
				.then(room => {
					this.chatroom = { id: room.id, ...room.data() }
				}),
				await db
					.collection('messages')
					.doc(this.$route.params.id)
					.collection('messages')
					.orderBy('createdAt')
					.onSnapshot(msgs => {
						chats = []
						msgs.forEach(message => {
							db.collection('users')
								.doc(message.data().senderId)
								.get()
								.then(doc => {
									chats.push({ ...message.data(), user: { ...doc.data() } })
								})
								.then(() => {
									this.messages = chats
								})
						})
					})
		}
	}
</script>

<style lang="scss" scoped>
	form {
		width: 25%;
	}
</style>