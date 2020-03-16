import Vue from 'vue'
import router from './router'
// import { firestorePlugin } from 'vuefire'
import store from './store'

import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
