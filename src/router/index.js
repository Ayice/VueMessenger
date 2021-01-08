import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
// import RightSection from '../components/Right'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,

	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			children: [
				{
					path: '/chatroom/:id',
					name: 'Chatroom',
					props: true,

					component: () =>
						import(
							/* webpackChunkName: "chatroom" */ '../components/ChatRoom.vue'
						)
				}
			]
		},
		{
			path: '/signup',
			name: 'SignUp',

			component: () =>
				import(/* webpackChunkName: "signup" */ '../components/SignUp.vue')
		},
		{
			path: '/user-chat/:id',
			name: 'UserChat',
			props: true,
			component: () =>
				import(/* webpackChunkName: "chatroom" */ '../components/ChatRoom.vue')
		},
		{
			path: '/profile/:id',
			name: 'Profile',
			props: true,

			component: () =>
				import(/* webpackChunkName: "profile" */ '../components/Profile.vue')
		},

		{
			path: '/update-profile/:id',
			name: 'UpdateProfile',
			props: true,

			component: () =>
				import(
					/* webpackChunkName: "updateProfile"*/ '../components/UpdateProfile.vue'
				)
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.path !== '/' && !store.state.user) {
		next('/')
	} else if (to.fullPath === '/signup' && store.state.user) {
		next('/')
	} else {
		next()
	}
})

export default router
