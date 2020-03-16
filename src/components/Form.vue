<template>
	<section class="form">
		<form @submit.prevent="addNewChatroom">
			<label for="name">Chatroom Name</label>
			<input type="text" v-model="newChatroom" required />
			<button type="submit">Create Chatroom</button>
		</form>
	</section>
</template>

<script>
	// import { eventBus } from '../main'
	import { mapActions } from 'vuex'

	export default {
		name: 'form-section',

		data() {
			return {}
		},
		methods: {
			...mapActions(['addNewChatroom'])
		},
		computed: {
			newChatroom: {
				get() {
					return this.$store.state.newChatroom
				},
				set(value) {
					this.$store.commit('setNewChatroom', value)
				}
			}
		}
	}
</script>

<style lang="scss">
	form {
		display: flex;
		flex-wrap: wrap;

		& > * {
			margin: 0.5em 0;
		}

		& > label {
			margin: 0;
		}

		input {
			height: 30px;
			width: 100%;
			border-radius: 5px;

			&:focus {
				outline: none;
			}
		}

		button {
			width: 50%;
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