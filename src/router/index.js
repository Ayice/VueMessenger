import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,

	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/about',
			name: 'About',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ '../views/About.vue')
		},
		{
			path: '/chatroom/:id',
			name: 'Chatroom',

			component: () =>
				import(/* webpackChunkName: "chatroom" */ '../components/ChatRoom.vue')
		},
		{
			path: '/signup',
			name: 'SignUp',

			component: () =>
				import(/* webpackChunkName: "signup" */ '../components/SignUp.vue')
		},
		{
			path: '/profile/:id',
			name: 'Profile',

			component: () =>
				import(/* webpackChunkName: "profile" */ '../components/Profile.vue')
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.path == '/profile/') {
		if (!store.state.user) {
			next('/')
		}
	}
	if (to.fullPath === '/signup') {
		if (store.state.user) {
			next('/')
		}
	}
	next()
})

export default router
