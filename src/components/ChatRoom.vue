<template>
	<div class="chatroom" v-if="currentChatroom">
		<h1>{{ currentChatroom.name }}</h1>

		<ul v-for="message in currentChatroomMessages" :key="message.id">
			<li :class="[message.senderId === user.id ? 'author' : 'receiver']">
				{{ message.sender }} :
				{{ message.message }}
			</li>
		</ul>

		<form @submit.prevent="sendMsg">
			<label>
				Message
				<input
					type="text"
					name="message"
					id="message"
					placeholder="Write your message here"
					v-model="message"
				/>
			</label>

			<span @click="sendMsg">
				<PaperPlane />
			</span>
		</form>
	</div>
</template>

<script>
	import { db } from '../firebase/firebase'
	import { mapState, mapActions } from 'vuex'
	import firebase from 'firebase'
	import PaperPlane from './icons/PaperPlane.vue'

	export default {
		name: 'Chatroom',
		props: ['id'],
		components: { PaperPlane },
		data() {
			return {
				message: ''
			}
		},

		computed: {
			...mapState({
				user: state => state.user,
				currentChatroom: state => state.currentChatroom,
				currentChatroomMessages: state => state.currentChatroomMessages
			})
		},

		watch: {
			id() {
				this.getCurrentChatroom(this.id)
			}
		},

		mounted() {
			this.getCurrentChatroom(this.id)
		},

		methods: {
			...mapActions(['getCurrentChatroom', 'getCurrentChatoomMessages']),

			sendMsg() {
				if (this.message === '') {
					return
				}
				db.collection('messages')
					.doc(this.id)
					.collection('messages')
					.add({
						message: this.message,
						sender: this.user.username,
						senderId: this.user.id,
						createdAt: firebase.firestore.Timestamp.now()
					})
					.then(() => {
						db.collection('chatrooms')
							.doc(this.id)
							.set(
								{
									lastMessage: this.message,
									lastSender: this.user.id
								},
								{ merge: true }
							)
					})
					.then(() => {
						this.message = ''
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chatroom {
		padding-top: 2em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		form {
			padding: 2em;
			width: 80%;
			position: relative;

			label {
				font-size: 1.3em;

				input {
					margin: 0.5em 0 0;
					padding: 0.5em;
					border: none;
					border-radius: 0;
					background: none;
					border-bottom: 1px solid #ffffff;

					&::placeholder {
						color: #ffffff;
					}
				}
			}
			span {
				cursor: pointer;

				&:hover {
					svg {
						animation-name: paperPlane;
						animation-duration: 0.3s;
					}
				}
			}
		}
		@keyframes paperPlane {
			0% {
				transform: translateY(0) rotateZ(0);
			}
			50% {
				transform: translateY(-10px);
			}
			100% {
				transform: translateY(0) rotateZ(0);
			}
		}
	}
</style>
