<template>
	<section class="form">
		<form @submit.prevent="addNewUser">
			<fieldset>
				<legend>Create User</legend>

				<div class="input-control">
					<input
						type="text"
						id="name"
						name="name"
						required
						v-model="newUserName"
					/>
					<label :class="newUserName !== '' ? 'not-empty' : ''" for="name"
						>Fullname</label
					>
				</div>

				<div class="input-control">
					<input
						type="email"
						id="email"
						name="email"
						required
						v-model="newUserEmail"
					/>
					<label :class="newUserEmail !== '' ? 'not-empty' : ''" for="email"
						>E-mail</label
					>
				</div>

				<div class="input-control">
					<input
						type="text"
						id="username"
						name="username"
						required
						v-model="newUserUserName"
					/>
					<label
						:class="newUserUserName !== '' ? 'not-empty' : ''"
						for="username"
						>Username</label
					>
				</div>

				<div class="input-control">
					<input
						type="password"
						id="password"
						name="password"
						required
						v-model="newUserPassword"
					/>
					<label
						:class="newUserPassword !== '' ? 'not-empty' : ''"
						for="password"
						>Password</label
					>
				</div>

				<div class="input-control">
					<input type="file" name="avatar" id="avatar" @change="avatarUpload" />
					<label for="avatar">Profile Picture</label>
				</div>

				<button class="success" type="submit">Create user</button>
			</fieldset>
		</form>
	</section>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex'

	export default {
		name: 'SignUp',

		methods: {
			...mapMutations(['avatarUpload']),
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

<style lang="scss" scoped>
	label[for='avatar'] {
		position: relative !important;
	}
	.form {
		display: flex;
		justify-content: center;

		form {
			fieldset {
				margin: 0 auto;
				width: 75%;
			}
		}
	}
</style>
