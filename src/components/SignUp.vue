<template>
	<section class="form">
		<form @submit.prevent="addNewUser">
			<fieldset>
				<legend>Sign up</legend>

				<div class="input-control">
					<input type="text" id="name" name="name" required v-model="newUserName" />
					<label for="name">Fullname</label>
				</div>

				<div class="input-control">
					<input type="email" id="email" name="email" required v-model="newUserEmail" />
					<label for="email">E-mail</label>
				</div>

				<div class="input-control">
					<input type="text" id="username" name="username" required v-model="newUserUserName" />
					<label for="username">Username</label>
				</div>

				<div class="input-control">
					<input type="password" id="password" name="password" required v-model="newUserPassword" />
					<label for="password">Password</label>
				</div>

				<button type="submit">Create user</button>
			</fieldset>
		</form>
	</section>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'SignUp',
		methods: {
			...mapActions(['addNewUser'])
		},
		computed: {
			newUserName: {
				get() {
					return this.$store.state.newUser.name
				},
				set(value) {
					this.$store.commit('setNewUserName', value)
				}
			},

			newUserUserName: {
				get() {
					return this.$store.state.newUser.username
				},
				set(value) {
					this.$store.commit('setNewUserUserName', value)
				}
			},

			newUserPassword: {
				get() {
					return this.$store.state.newUser.password
				},
				set(value) {
					this.$store.commit('setNewUserPassword', value)
				}
			},

			newUserEmail: {
				get() {
					return this.$store.state.newUser.email
				},
				set(value) {
					this.$store.commit('setNewUserEmail', value)
				}
			}
		}
	}
</script>

<style>
</style>
