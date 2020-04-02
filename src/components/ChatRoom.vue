<template>
	<div class="chatroom" v-if="currentChatroom">
		<h1>{{ currentChatroom.name }}</h1>

		<div class="message-stuff">
			<transition-group tag="div" name="slide" class="messages-container">
				<Message
					v-for="message in currentChatroomMessages"
					:key="message.id"
					:class="[message.senderId === user.id ? 'author' : 'receiver']"
					:message="message"
				/>
			</transition-group>

			<div class="new-message-container">
				<div
					class="new-message"
					:class="newMessage !== '' ? 'hide-placeholder' : ''"
					@keydown.enter.exact.prevent="sendMsg()"
					@input="handleChange($event)"
					contenteditable="true"
				></div>

				<span class="send-icon" @click="sendMsg">
					<PaperPlane />
				</span>
			</div>
		</div>

		<div class="chat-options-div" :class="showAddMenu ? 'show' : ''">
			<div class="chat-options-button" @click="showAddMenu = !showAddMenu">
				<GearsIcon />
			</div>

			<section class="add-section">
				<h2>Add Friend to Chat</h2>
				<UserView
					v-for="friend in friends"
					:key="friend.id"
					:chatroom="true"
					:remove="false"
					:user="friend"
				/>
			</section>
		</div>
	</div>
</template>

<script>
	import { db } from '../firebase/firebase'
	import { mapState, mapActions } from 'vuex'
	import firebase from 'firebase'
	import PaperPlane from './icons/PaperPlane.vue'
	import Message from './Message.vue'
	import UserView from './UserView.vue'
	import GearsIcon from './icons/GearsIcon.vue'

	export default {
		name: 'Chatroom',
		props: ['id'],
		components: { PaperPlane, Message, UserView, GearsIcon },
		data() {
			return {
				newMessage: '',
				showAddMenu: false
			}
		},
		methods: {
			...mapActions(['getCurrentChatroom', 'getCurrentChatoomMessages']),

			handleChange($event) {
				this.newMessage = $event.target.innerHTML
			},

			sendMsg() {
				if (this.newMessage === '') {
					return
				}

				db.collection('messages')
					.doc(this.id)
					.collection('messages')
					.add({
						message: this.newMessage,
						sender: this.user.username,
						senderId: this.user.id,
						createdAt: firebase.firestore.Timestamp.now()
					})
					.then(() => {
						db.collection('chatrooms')
							.doc(this.id)
							.set(
								{
									lastMessage: this.newMessage,
									lastSender: this.user.id
								},
								{ merge: true }
							)
					})
					.then(() => {
						this.newMessage = ''
						document.querySelector('.new-message').innerHTML = ''
					})
			}
		},

		watch: {
			id() {
				this.getCurrentChatroom(this.id)
			}
		},

		mounted() {
			this.getCurrentChatroom(this.id)
		},

		computed: {
			...mapState({
				user: state => state.user,
				currentChatroom: state => state.currentChatroom,
				currentChatroomMessages: state => state.currentChatroomMessages,
				friends: state => state.friends
			})
		}
	}
</script>

<style lang="scss" scoped>
	.chatroom {
		position: relative;
		overflow: hidden;
		min-height: 50vh;
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
			height: 45vh;
			overflow-y: auto;
			padding: 0 0.5em 1em;
		}

		.chat-options-div {
			position: absolute;
			top: 5%;
			right: 0;
			bottom: 10%;
			width: 50px;
			z-index: 10;
			transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
			pointer-events: none;

			&.show {
				width: 100%;

				.add-section {
					pointer-events: all;
					opacity: 1;
				}
			}

			.chat-options-button {
				cursor: pointer;
				border: 1px solid rgba(187, 187, 187, 0.643);
				pointer-events: all;
				padding: 0.2em;
				z-index: 100;
				position: relative;
				height: 40px;
				width: 40px;

				svg {
					transition: all 0.1s ease-in;
				}

				&:hover {
					svg {
						fill: rgb(197, 197, 197);
					}
				}
			}
		}

		.add-section {
			pointer-events: none;
			position: absolute;
			border-top-left-radius: 15px;
			border-bottom-left-radius: 15px;
			top: 0;
			right: 0;
			bottom: 0;
			width: 80%;
			opacity: 0;
			background-color: #fff;
			overflow: hidden;
			box-shadow: 0px 0px 8px #333;
			transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
			padding: 2em 1em 0;

			.friend {
				width: 80%;
			}
		}

		.slide-enter-active {
			transition: all 0.3s ease;
		}

		.slide-leave-active {
			transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
		}

		.slide-enter,
		.slide-fade-leave-to {
			transform: translateX(-10px);
			opacity: 0;
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
