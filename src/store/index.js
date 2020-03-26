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
		friends: [],
		newUser: {
			name: '',
			username: '',
			password: '',
			email: ''
		},
		currentChatroom: {},
		currentChatroomMessages: [],
		errorMsg: '',
		members: null
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
			state.friends = null
		},

		setAllUsers(state, value) {
			state.allUsers = value
		},

		setFriends(state, value) {
			state.friends = value
		},

		setCurrentChatroom(state, value) {
			state.currentChatroom = value
		},

		setCurrentChatroomMessages(state, value) {
			state.currentChatroomMessages = value
		},

		setErrorMsg(state, value) {
			state.errorMsg = value
		},

		setMembers(state, members) {
			return new Promise(resolve => {
				state.members = members
				resolve()
			})
		}
	},

	actions: {
		/**
		 *
		 * Handling user actions
		 *
		 */

		addNewUser({ commit, state }) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(
					state.newUser.email,
					state.newUser.password
				)
				.then(response => {
					db.collection('users')
						.doc(response.user.uid)
						.set({
							name: state.newUser.name,
							username: state.newUser.username,
							email: state.newUser.email,
							id: response.user.uid
						})
				})
				.then(() => {
					alert('You created a user')
					router.push('/')
				})
				.catch(() => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						'Something went wrong with creating a user. Try again'
					)
				})
		},

		async updateUser({ state, commit, dispatch }, value) {
			commit('setStatus', 'loading')
			if (value.username) {
				await dispatch('checkUserName', value.username)
			}
			if (value.email) {
				await dispatch('updateUserEmail', value.email)
			}
			db.collection('users')
				.doc(state.user.id)
				.update({
					...value
				})
				.then(() => {
					db.collection('users')
						.doc(state.user.id)
						.get()
						.then(async user => {
							return dispatch('checkUser', user).then(() => {
								commit('setStatus', 'success')
							})
						})
				})
				.catch(() => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						'There was a problem updating your user. Try Again'
					)
				})
		},

		checkUserName({ commit }, username) {
			return new Promise((resolve, reject) => {
				db.collection('users')
					.where('username', '==', username)
					.get()
					.then(user => {
						if (user.docs.length > 0) {
							reject()
							commit('setStatus', 'error')
							commit('setErrorMsg', 'This username already exists')
						} else {
							resolve()
						}
					})
			})
		},

		updateUserEmail({ commit }, email) {
			return new Promise((resolve, reject) => {
				const user = firebase.auth().currentUser
				user
					.updateEmail(email)
					.then(() => {
						resolve()
					})
					.catch(() => {
						reject()
						commit('setStatus', 'error')
						commit(
							'setErrorMsg',
							'An error occured while updating your email. Try again in a moment'
						)
					})
			})
		},

		updateUserPassword({ commit }, password) {
			commit('setStatus', 'loading')
			const user = firebase.auth().currentUser
			user
				.updatePassword(password)
				.then(() => {
					commit('setStatus', 'success')
				})
				.catch(() => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						'An error occured trying to update your password. Try again in a moment'
					)
				})
		},

		/**
		 *
		 * Handling login/out
		 *
		 */

		// Handle userLogin
		login({ commit }, value) {
			// Wait for our Firebase response
			firebase
				.auth()
				.signInWithEmailAndPassword(value.email, value.password)

				.catch(() => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						"The Information you entered wasn't correct. Try Again"
					)
				})
		},

		// Handle logout
		logout() {
			// Firebase function
			firebase.auth().signOut()
		},

		// Handling our user that is logged in
		checkUser({ commit }, user) {
			// Returning promise, so our login action from earlier know
			// when this is done.
			let id = ''

			if (user.id) {
				id = user.id
			} else {
				id = user.uid
			}
			return new Promise((resolve, reject) => {
				db.collection('users')
					.doc(id)
					.get()
					.then(response => {
						// Commit mutation, with our user's data
						commit('setUser', response.data())
					})
					.then(() => {
						// Resolve so our Login action can continue
						resolve()
					})
					.catch(() => {
						commit('setStatus', 'error')
						commit(
							'setErrorMsg',
							'We had an internal error... Try again in a moment'
						)
						reject()
					})
			})
		},

		/**
		 *
		 * Handling friends/contacts
		 *
		 */

		//  Handling new friend request
		addNewFriend({ commit, state }, friendId) {
			commit('setStatus', 'loading')

			db.collection('contacts')
				// Using current user's id to find the right doc
				.doc(state.user.id)
				.set(
					{
						// [] lets Firebase know that it is a variable we are referencing
						// And the key should NOT be "friendId.id"
						[friendId.id]: true
					},
					// Merge to tell Firebase, that this should not erase
					// other data in the document
					{ merge: true }
				)
				// Then we do pretty much the same thing, but in the
				// new friend's document
				.then(() => {
					db.collection('contacts')
						.doc(friendId.id)
						.set(
							{
								[state.user.id]: true
							},
							{ merge: true }
						)
				})
				.then(() => {
					commit('setStatus', 'success')
				})
				.catch(err => {
					console.log(err)
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						`An error occured when trying to add ${friendId.username} to your friendlist. Try again in a moment`
					)
				})
		},

		// Fetchin the user's friends
		async getFriendsArray({ commit, dispatch, state }) {
			commit('setStatus', 'loading')
			return new Promise((resolve, reject) => {
				// Creating an array for future need
				let friendId = []
				db.collection('contacts')
					.doc(state.user.id)
					// onSnapShot creates a listener to this document, and will
					// detect changes
					.onSnapshot(async doc => {
						// Check if our doc.data() is undefined, because then we will have no friends...
						if (doc.data() !== undefined) {
							// We only need the keys from our Db, because we here have the ids
							friendId = Object.keys(doc.data())
							// When we are fetching our friends, we dont want a user to see him self
							// If he added himself some kind of way ???
							const filteredFriendId = friendId.filter(x => x !== state.user.id)
							// We only have the ids of the user's friends
							// So now we are running another action to get the data
							return dispatch('getFriendsData', filteredFriendId)
								.then(() => {
									resolve()
								})
								.catch(() => {
									commit('setStatus', 'error')
									commit(
										'setErrorMsg',
										'An internal error occured try to log on again'
									)
									reject()
								})
						} else {
							// If our response from Firebase is empty just resolve
							commit('setFriends', [])
							resolve()
						}
					})
			}).then(() => {
				commit('setStatus', 'success')
			})
		},

		// Get data of current user's friends
		getFriendsData({ commit, dispatch }, friendIds) {
			let friendDataArray = []
			return new Promise((resolve, reject) => {
				// Checking if the data we get is empty
				// But i won't
				if (friendIds.length > 0) {
					// For every of the id, we need to fetch the data from Firebase
					friendIds.forEach(friendId => {
						db.collection('users')
							.doc(friendId)
							.get()
							.then(friendData => {
								// After we get a friend's data
								// we push it into an array
								friendDataArray.push({
									id: friendData.id,
									...friendData.data()
								})
							})
							.then(() => {
								// Commit a mutation, that sets the friends of the current user
								commit('setFriends', friendDataArray)
								// Run another action
								dispatch('allUsers')
								// Now resolve so our other actions know we are done
								resolve()
							})
							.catch(() => {
								reject()
							})
					})
				} else {
					// If the data we are getting is empty
					// Commit the mutation, with an empty array
					commit('setFriends', [])
					resolve()
				}
			})
		},

		removeFriend({ commit, state }, friendId) {
			commit('setStatus', 'loading')
			db.collection('contacts')
				.doc(state.user.id)
				.update({
					[friendId]: firebase.firestore.FieldValue.delete()
				})
				.then(() => {
					db.collection('contacts')
						.doc(friendId)
						.update({
							[state.user.id]: firebase.firestore.FieldValue.delete()
						})
				})
				.then(() => {
					commit('setStatus', 'success')
				})
				.catch(err => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						'An error occured when trying to remove the user from your friendlist. Try again in a moment'
					)
					console.log(err)
				})
		},

		/**
		 *
		 * Handle all chatroom calls
		 *
		 */

		addNewChatroom({ commit, state }) {
			let newChatroomId = ''
			commit('setStatus', 'loading')
			db.collection('chatrooms')
				.add({
					name: state.newChatroom,
					authorId: state.user.id
				})
				.then(chatroomData => {
					newChatroomId = chatroomData.id
					db.collection('user-rooms')
						.doc(state.user.id)
						.set(
							{
								[chatroomData.id]: true
							},
							{ merge: true }
						)
				})
				.then(() => {
					db.collection('members')
						.doc(newChatroomId)
						.set(
							{
								[state.user.id]: true
							},
							{ merge: true }
						)
				})
				.then(() => {
					commit('setStatus', 'success')
					commit('setNewChatroom', '')
				})
		},

		leaveChatroom({ dispatch, commit, state }, chatroom) {
			commit('setStatus', 'loading')

			if (chatroom.authorId === state.user.id) {
				dispatch('removeChatroom', chatroom)
			} else {
				db.collection('members')
					.doc(chatroom.id)
					.update({
						[state.user.id]: firebase.firestore.FieldValue.delete()
					})
			}

			db.collection('user-rooms')
				.doc(state.user.id)
				.update({
					[chatroom.id]: firebase.firestore.FieldValue.delete()
				})
				.then(() => {
					commit('setStatus', 'success')
				})
				.catch(() => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						'An error occured when trying to remove the chatroom from your chatroomlist. Try again in a moment'
					)
				})
		},

		removeChatroom({ commit }, value) {
			db.collection('chatrooms')
				.doc(value.id)
				.delete()
				.then(() => {
					db.collection('members')
						.doc(value.id)
						.get()
						.then(doc => {
							let ids = Object.keys(doc.data())
							if (ids.length < 1) {
								return
							}
							ids.forEach(userId => {
								db.collection('user-rooms')
									.doc(userId)
									.update({
										[value.id]: firebase.firestore.FieldValue.delete()
									})
							})
						})
				})
				.then(() => {
					db.collection('members')
						.doc(value.id)
						.delete()
						.then(() => {
							console.log('Chatroom deleted Wuhuu')
						})
				})

				.catch(() => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						'An error occurred deleting the chatroom. Try again in a moment'
					)
				})
		},

		addToChatroom({ state, commit }, userId) {
			commit('setStatus', 'loading')
			db.collection('user-rooms')
				.doc(userId)
				.set(
					{
						[state.currentChatroom.id]: true
					},
					{ merge: true }
				)
				.then(() => {
					db.collection('members')
						.doc(state.currentChatroom.id)
						.set(
							{
								[userId]: true
							},
							{ merge: true }
						)
				})
				.then(() => {
					commit('setStatus', 'success')
				})
		},

		getChatroomMembers({ commit }, chatroom) {
			return new Promise((resolve, reject) => {
				let membersArray = []
				db.collection('members')
					.doc(chatroom.id)
					.onSnapshot(members => {
						if (!members.data()) {
							return new Error()
						}

						let memberIds = Object.keys(members.data())
						let count = 0
						membersArray = []
						memberIds.forEach((member, index, array) => {
							db.collection('users')
								.doc(member)
								.get()
								.then(member => {
									count++
									membersArray.push(member.data())
									if (count === array.length) {
										resolve()

										commit('setMembers', membersArray)
									}
								})
								.catch(error => {
									console.log(error)
									reject()
									commit('setStatus', 'error')
									commit(
										'setStatus',
										'An error occurred trying to fetch chatrooms. Try again in a moment'
									)
								})
						})
					})
			})
		},

		// Handle getting chatrooms
		getChatrooms({ commit, state, dispatch }) {
			commit('setStatus', 'loading')
			db.collection('user-rooms')
				// Only find chatrooms that our user is
				// a part of
				.doc(state.user.id)
				.onSnapshot(roomIds => {
					const rooms = []
					let ids = Object.keys(roomIds.data())
					// If there are no rooms return an empty array
					if (ids.length < 1) {
						commit('setChatrooms', rooms)
						commit('setStatus', 'success')
						return
					}
					// We need the keys(chatroom ids) to get the chatroom data
					// Get the data from all the ids
					ids.forEach(chatroomId => {
						db.collection('chatrooms')
							.doc(chatroomId)
							.get()
							.then(async chatroom => {
								await dispatch('getChatroomMembers', chatroom)
								rooms.push({
									...chatroom.data(),
									id: chatroom.id,
									members: state.members
								})

								commit('setChatrooms', rooms)
								commit('setStatus', 'success')
							})
							.catch(() => {
								commit('setStatus', 'error')
								commit(
									'setErrorMsg',
									'An internal error happened. Try again in a moment'
								)
							})
					})
				})
		},

		getCurrentChatroom({ state, commit, dispatch }, value) {
			commit('setStatus', 'loading')
			db.collection('chatrooms')
				.doc(value)
				.get()
				.then(room => {
					commit('setCurrentChatroom', { id: room.id, ...room.data() })
				})
				.then(async () => {
					return dispatch(
						'getCurrentChatroomMessages',
						state.currentChatroom.id
					).then(() => {
						commit('setStatus', 'success')
					})
				})
				.catch(() => {
					commit('setStatus', 'error')
					commit(
						'setErrorMsg',
						'An error occured trying to find the chatroom. Try again in a moment'
					)
				})
		},

		getCurrentChatroomMessages({ commit }, value) {
			let chats = []
			return new Promise(resolve => {
				db.collection('messages')
					.doc(value)
					.collection('messages')
					.orderBy('createdAt', 'desc')
					.limit(10)

					.onSnapshot(async msgs => {
						if (msgs.docs.length > 0) {
							chats = []
							msgs.forEach(message => {
								chats.push({ id: message.id, ...message.data() })
								if (msgs.docs.length === chats.length) {
									chats = chats.slice().reverse()
									commit('setCurrentChatroomMessages', chats)
									resolve()
								}
							})
						} else {
							commit('setCurrentChatroomMessages', chats)
							resolve()
						}
					})
			})
		},

		/**
		 *
		 * Handle all users call
		 *
		 */

		// Get all users
		allUsers({ commit, state }) {
			db.collection('users').onSnapshot(async users => {
				let allUsers
				allUsers = []
				// Push all users into the same array
				users.forEach(user => {
					allUsers.push(user.data())
				})
				const filteredUsers = []
				// Filter the current user out of the array
				// So he wont see himself
				const filteredCurUser = allUsers.filter(x => x.id !== state.user.id)
				// Return a promise, so we can fire something when it's finished
				return new Promise(resolve => {
					// We want to remove the friends of our currentUser, so they won't
					// See them in the all users section
					// Run a forEach over the users
					filteredCurUser.forEach((user, index, array) => {
						let count = 0
						// Run a forEach over the friends inside the other forEach
						// So we are running each of the users over each of the friends
						state.friends.forEach(friend => {
							// If they have same id increment count with 1
							// So we know the id is seen in both arrays
							if (friend.id === user.id) {
								count++
								return
							}
						})

						// If filteredCurUser.length - 1 is the same as index, we have gone through all
						// the objects in the array and therefore we can resolve
						if (array.length - 1 == index) {
							resolve()
						}
						// Check if count is higher than 0, so we can see if the
						// same user is in both arrays and therefore NOT push them into our
						// final array
						// Reset count aswell, so it wont be 1 for the next loop
						if (count > 0) {
							count = 0
							return
						} else {
							// Push the user into our array
							filteredUsers.push(user)
						}
					})
					// When we have resolved run the new Set instance
					// Removes all duplicates
					// Then commit our mutation to set all users
				}).then(() => {
					const allUser = new Set(filteredUsers)
					commit('setAllUsers', allUser)
				})
			})
		}
	},

	getters: {},
	modules: {}
})
