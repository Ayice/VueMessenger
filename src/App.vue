<template>
	<div class="app">
		<!-- <Test /> -->
		<div v-if="status === 'loading'" class="loader">
			<h1>LOADING...</h1>
		</div>

		<div v-else-if="status === 'error'" class="loader">
			<h1>An Error occured, try again..</h1>
			<p>{{ errorMsg }}</p>
			<button @click="removeError()">Try again...</button>
		</div>

		<div
			class="router-container"
			:class="{ loading: status !== 'success' || showModal }"
		>
			<div class="nav">
				<router-link to="/">Home</router-link> |
				<router-link to="/signup" v-if="!user">Create User</router-link>
				<router-link :to="'/profile/' + user.id" v-if="user !== null"
					>Profile</router-link
				>
				|

				<button @click="logout">Log out</button>
			</div>
			<transition name="slide-in">
				<router-view />
			</transition>
		</div>
		<Modal />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Modal from './components/Modal.vue'
	// import Test from './compon ents/Test.vue'
	export default {
		components: { Modal },
		computed: {
			...mapState(['user', 'status', 'errorMsg', 'showModal'])
		},
		methods: {
			...mapActions(['logout']),
			removeError() {
				this.$store.commit('setStatus', 'success')
			}
		}
	}
</script>

<style lang="scss">
	button {
		cursor: pointer;
		padding: 0.8em;
		border: none;
		border-radius: 5px;
		background-color: #fff;
		transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
		box-shadow: 2px 2px 6px 2px rgb(172, 170, 170);

		&:hover {
			box-shadow: 2px 2px 3px 1px rgb(172, 170, 170);
		}
	}

	.slide-in-enter-active {
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.slide-in-enter,
	.slide-in-leave-to {
		transform: translateY(20px);
	}

	.app {
		font-size: 16px;
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
		flex-direction: column;

		h1 {
			font-size: 2em;
		}
	}

	form {
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		width: 60%;

		fieldset {
			margin: 0;
			padding: 0;
			border: none;

			legend {
				padding-top: 1em;
				font-size: 1.5em;
			}
		}

		.input-control {
			position: relative;
			display: flex;
			margin: 0.8em 0;
			flex-direction: column-reverse;

			input {
				padding: 0.3em;
				border-radius: 0;
				border: none;
				border-bottom: 1px solid rgb(95, 95, 95);
				font-size: 1.3em;

				&.not-empty {
					border-bottom: 1px solid #42b983;
				}

				&:focus {
					outline: none;
					border-bottom: 1px solid #42b983;

					+ label {
						bottom: 80%;
						font-size: 70%;
						left: 2%;
					}
				}
			}

			label {
				cursor: pointer;
				position: absolute;
				width: 100%;
				bottom: 0;
				left: 0;
				margin: 0.5em 0 0.3em;
				transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

				&.not-empty {
					color: #42b983;
					bottom: 80%;
					font-size: 70%;
					left: 2%;
				}
			}
		}

		button {
			background-color: #42b983;
			border: none;
			outline: none;
			color: #fff;
			font-size: 1.3em;
			border-radius: 5px;
			cursor: pointer;
			box-shadow: 3px 4px 10px #333;
		}
	}
</style>
