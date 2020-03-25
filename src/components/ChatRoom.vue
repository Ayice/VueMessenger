<template>
	<div class="chatroom" v-if="currentChatroom">
		<h1>{{ currentChatroom.name }}</h1>

		<div class="messages-container">
			<Message
				v-for="message in currentChatroomMessages"
				:key="message.id"
				:class="[message.senderId === user.id ? 'author' : 'receiver']"
				:message="message"
			/>
		</div>

		<div class="new-message-container">
			<div
				class="new-message"
				:class="message !== '' ? 'hide-placeholder' : ''"
				@keydown.enter.exact.prevent="sendMsg($event)"
				@input="handleChange($event)"
				contenteditable="true"
			></div>

			<span class="send-icon" @click="sendMsg">
				<PaperPlane />
			</span>
		</div>
		<button @click="showAddMenu = !showAddMenu">Add</button>
		<section class="add-section" :class="showAddMenu ? 'show' :''">
			<Friends :remove="false" />
		</section>
	</div>
</template>

<script>
	import { db } from '../firebase/firebase'
	import { mapState, mapActions } from 'vuex'
	import firebase from 'firebase'
	import PaperPlane from './icons/PaperPlane.vue'
	import Message from './Message'
	import Friends from './Friends'

	export default {
		name: 'Chatroom',
		props: ['id'],
		components: { PaperPlane, Message, Friends },
		data() {
			return {
				message: '',
				showAddMenu: false
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

			handleChange($event) {
				this.message = $event.target.innerHTML
			},

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
						document.querySelector('.message').innerHTML = ''
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chatroom {
		position: relative;
		overflow: hidden;
		width: 100%;
		padding: 2em 1em 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.new-message-container {
			width: 100%;
			position: relative;
			display: flex;

			.new-message {
				width: 90%;
				max-width: 90%;
				max-height: 200px;
				overflow-y: auto;
				overflow-x: hidden;
				outline: none;
				user-select: text;
				white-space: pre-wrap;
				overflow-wrap: break-word;
				border-bottom: 1px solid #000;
				position: relative;

				&::after {
					content: 'Write a message';
					font-size: 0.8em;
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					pointer-events: none;
				}

				&.hide-placeholder {
					&::after {
						content: '';
					}
				}
			}

			.send-icon {
				cursor: pointer;
				svg {
					position: absolute;
					width: 50px;
					transition: cubic-bezier(0.165, 0.84, 0.44, 1);
					right: 0;
					bottom: 0;
				}

				&:hover {
					svg {
						cursor: pointer;

						animation-name: paperPlane;
						animation-duration: 0.3s;
					}
				}
			}
		}

		.messages-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			border-bottom: 1px solid #000;
			margin-bottom: 2em;
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

		.add-section {
			position: absolute;
			right: 0;
			top: 0;
			width: 0;
			height: 100%;
			z-index: 1;

			&.show {
				// right: 100%;
				width: 100%;
			}
		}
	}
</style>
