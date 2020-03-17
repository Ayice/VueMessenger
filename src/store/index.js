import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { db } from '../firebase/firebase'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		allUsers: [],
		chatrooms: [],
		newChatroom: '',
		user: null,
		status: null,
		newUser: {
			name: '',
			username: '',
			password: '',
			email: ''
		}
	},
	mutations: {
		setNewUserEmail(state, value) {
			state.newUser.email = value
		},

		setNewUserName(state, value) {
			state.newUser.name = value
		},

		setNewUserUserName(state, value) {
			state.newUser.username = value
		},

		setNewUserPassword(state, value) {
			state.newUser.password = value
		},

		setNewChatroom(state, value) {
			state.newChatroom = value
		},

		setChatrooms(state, payload) {
			state.chatrooms = payload
		},

		setStatus(state, value) {
			state.status = value
		},

		setUser(state, value) {
			state.user = value
		},

		setUserLogOut(state) {
			state.user = null
		},

		addNewChatroom(state) {
			db.collection('chatrooms')
				.add({
					name: state.newChatroom
				})
				.then(chatroomData => {
					db.collection('user-rooms')
						.doc(state.user.id)
						.set(
							{
								[chatroomData.id]: true
							},
							{ merge: true }
						)
				})
		},

		removeChatroom(state, value) {
			db.collection('chatrooms')
				.doc(value.id)
				.delete()
				.then(() => {
					console.log('Deleted Chatroom')
				})
				.catch(err => {
					state.status = 'error'
					console.log(err)
				})
		},

		setAllUsers(state, value) {
			state.allUsers = value
		},

		setFriends(state, value) {
			state.user.friends = value
		}
	},

	actions: {
		addNewUser(context) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(
					context.state.newUser.email,
					context.state.newUser.password
				)
				.then(response => {
					db.collection('users')
						.doc(response.user.uid)
						.set({
							name: context.state.newUser.name,
							username: context.state.newUser.username,
							email: context.state.newUser.email,
							id: response.user.uid
						})
						.catch(err => {
							console.log(err, 'database')
						})
				})
				.then(() => {
					alert('You created a user')
					router.push('/')
				})
				.catch(err => {
					// Handle Errors here.
					var errorCode = err.code
					var errorMessage = err.message

					console.log(errorCode, errorMessage)
					// ...
				})
		},

		addNewFriend({ commit, state }, friendId) {
			commit('setStatus', 'loading')

			db.collection('contacts')
				.doc(state.user.id)
				.set(
					{
						[friendId.id]: true
					},
					{ merge: true }
				)
				.then(() => {
					commit('setStatus', 'success')
				})
		},

		getFriendsArray({ dispatch, commit, state }) {
			return new Promise((resolve, reject) => {
				let friendId = []
				commit('setStatus', 'loading')
				db.collection('contacts')
					.doc(state.user.id)
					.onSnapshot(doc => {
						if (doc.data()) {
							friendId = Object.keys(doc.data())
							return dispatch('getFriendsData', friendId)
								.then(() => {
									resolve()
								})
								.catch(() => {
									reject()
								})
						}
					})
			})
		},

		getFriendsData({ commit }, friendIds) {
			let friendDataArray = []
			return new Promise((resolve, reject) => {
				if (friendIds.length > 0) {
					friendIds.forEach(friendId => {
						db.collection('users')
							.doc(friendId)
							.get()
							.then(friendData => {
								friendDataArray.push({
									id: friendData.id,
									...friendData.data()
								})
							})
							.then(() => {
								commit('setFriends', friendDataArray)
								resolve()
							})
							.catch(() => {
								reject()
							})
					})
				} else {
					commit('setFriends', [])
				}
			})
		},

		addNewChatroom(context) {
			context.commit('addNewChatroom')
			context.commit('setNewChatroom', '')
		},

		removeChatroom(context, value) {
			context.commit('removeChatroom', value)
		},

		getChatrooms(context) {
			context.commit('setStatus', 'loading')
			db.collection('user-rooms')
				.doc(context.state.user.id)

				.onSnapshot(roomIds => {
					if (!roomIds.data()) {
						return
					}
					const rooms = []
					let ids = Object.keys(roomIds.data())
					ids.forEach(chatroom => {
						db.collection('chatrooms')
							.doc(chatroom)
							.get()
							.then(chatroom => {
								rooms.push({ ...chatroom.data(), id: chatroom.id })
								context.commit('setStatus', 'success')
								context.commit('setChatrooms', rooms)
							})
					})
				})
		},

		async login({ dispatch }, value) {
			await firebase
				.auth()
				.signInWithEmailAndPassword(value.email, value.password)
				.then(() => {
					return dispatch('checkUser').then(() => {
						return dispatch('getFriendsArray')
					})
				})
		},

		logout(context) {
			firebase
				.auth()
				.signOut()
				.then(() => {
					context.commit('logout')
				})
		},

		checkUser(context) {
			return new Promise((resolve, reject) => {
				firebase.auth().onAuthStateChanged(user => {
					if (user) {
						db.collection('users')
							.doc(user.uid)
							.get()
							.then(response => {
								context.commit('setUser', response.data())
							})
							.then(() => {
								router.push('/profile/' + context.state.user.id)
							})
							.then(() => {
								resolve()
							})
							.catch(() => {
								reject()
							})
					}
				})
			})
		},

		allUsers(context) {
			db.collection('users').onSnapshot(users => {
				let allUsers = []
				allUsers = []
				users.forEach(user => {
					allUsers.push(user.data())
				})
				context.commit('setAllUsers', allUsers)
			})
		}
	},
	modules: {}
})
