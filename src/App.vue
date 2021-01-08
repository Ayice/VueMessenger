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
				<a class="logout-button" @click.prevent="logout">Log out</a>
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

	export default {
		components: { Modal },
		computed: {
			...mapState(['user', 'status', 'errorMsg', 'showModal'])
		},
		methods: {
			...mapActions(['logout', 'friendChat']),
			removeError() {
				this.$store.commit('setStatus', 'success')
			}
		}
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&family=Roboto:wght@500&display=swap');
	.title {
		font-size: 1.25rem;
		margin: 0;
	}

	body {
		font-family: 'Poppins', sans-serif;
		margin: 0;
		min-height: 100vh;
	}

	.logout-button {
		cursor: pointer;
		padding: 0;
		box-shadow: none;
		border: none;
		&:hover {
			background-color: #fff;
		}
	}

	button {
		font-family: 'Roboto', sans-serif;
		cursor: pointer;
		padding: 2%;
		border-radius: 3px;
		background-color: #03a9f4;
		transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
		color: #fff;
		font-weight: 500;
		font-size: 14px;
		border: none;
		outline: none;

		&:hover {
			background-color: lighten($color: #03a9f4, $amount: 10);
		}

		& ~ button {
			margin-left: 5px;
		}

		&.success {
			background-color: #42b983;
			color: #fff;
			box-shadow: 3px 4px 10px #333;

			&:hover {
				background-color: lighten($color: #42b983, $amount: 10);
			}
		}
	}

	.slide-in-enter-active {
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.slide-in-enter,
	.slide-in-leave {
		transform: translateY(20px);
	}

	.app {
		font-size: 16px;
		font-weight: 700;
		margin: 0 auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		color: #2c3e50;
	}

	.nav {
		text-align: right;
		box-shadow: 3px 0px 6px #bfbfbf;
		margin-bottom: 12px;
		padding: 12px 6px;
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
				font-size: 1em;

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
	}
</style>
