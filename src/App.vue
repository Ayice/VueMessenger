<template>
	<div class="app">
		<div v-if="status === 'loading'" class="loader">
			<h1>LOADING...</h1>
		</div>

		<div v-else-if="status === 'error'" class="loader">
			<h1>An Error occured, try again..</h1>
		</div>

		<div class="router-container" :class="{ loading: status !== 'success' }">
			<div class="nav">
				<router-link to="/">Home</router-link>|
				<router-link to="/signup" v-if="!user">Create User</router-link>|
				<router-link :to="'/profile/' + user.id">Profile</router-link>|
				<router-link to="/about">About</router-link>

				<button @click="logout">Log out</button>
			</div>
			<router-view />
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		computed: {
			...mapState(['user', 'status'])
		},
		methods: { ...mapActions(['logout']) }
	}
</script>

<style lang="scss">
	.app {
		font-weight: 700;
		max-width: 950px;
		margin: 0 auto;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		color: #2c3e50;
	}

	.nav {
		text-align: center;
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
	.router-container {
		&.loading {
			filter: blur(8px);
		}
	}

	.loader {
		position: absolute;
		display: flex;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		z-index: 1;
		background-color: transparent;
		justify-content: center;
		align-items: center;

		h1 {
			font-size: 2em;
		}
	}

	.remove {
		font-weight: 700;
		cursor: pointer;
		transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);

		&:hover {
			transform: rotate(360deg);
		}
	}
</style>
