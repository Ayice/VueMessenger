import Vue from 'vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
	router,
	store,
	render: h => h(App),
	created() {
		store.commit('setStatus', 'loading')
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				store.commit('setStatus', 'loading')
				// Fetch the user data, if we have a user
				store.dispatch('checkUser', user).then(async () => {
					return store.dispatch('getFriendsArray').then(() => {
						// If we resolve() all the actions, we can set status to Success
						// And redirect to the user's profile
						store.commit('setStatus', 'success')
						router.push('/profile/' + store.state.user.id)
					})
				})
			} else {
				store.commit('setStatus', 'success')
				store.commit('setUserLogOut')
				router.push('/')
			}
		})
	}
}).$mount('#app')
