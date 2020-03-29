<template>
	<section v-if="id === user.id">
		<form @submit.prevent="handleUpdate">
			<fieldset>
				<legend>Update your profile</legend>
				<div class="input-control">
					<input
						id="name"
						type="text"
						name="name"
						v-model="form.name"
						:class="form.name !== '' ? 'not-empty' : ''"
					/>
					<label :class="form.name !== '' ? 'not-empty' : ''" for="name">Full name</label>
				</div>

				<div class="input-control">
					<input
						type="text"
						id="username"
						name="username"
						v-model="form.username"
						:class="form.username !== '' ? 'not-empty' : ''"
					/>
					<label :class="form.username !== '' ? 'not-empty' : ''" for="username">Username</label>
				</div>

				<div class="input-control">
					<input
						type="email"
						name="email"
						id="email"
						v-model="form.email"
						:class="form.email !== '' ? 'not-empty' : ''"
					/>
					<label :class="form.email !== '' ? 'not-empty' : ''" for="email">Email</label>
				</div>

				<button type="submit">Update Profile</button>
			</fieldset>
		</form>

		<button @click="updatePassword = !updatePassword">Update your password</button>

		<form v-if="updatePassword" @submit.prevent="handleUpdatePassword" class="update-password">
			<fieldset :class="samePassword ? 'correctPassword' : ''">
				<legend>Update Password</legend>

				<div class="input-control">
					<input
						:class="password !== '' ? 'not-empty' : ''"
						type="password"
						v-model="password"
						name="password"
						id="password"
					/>
					<label :class="password !== '' ? 'not-empty' : ''" for="password">Password</label>
				</div>

				<div class="input-control">
					<input
						:class="confirmPassword !== '' ? 'not-empty' : ''"
						type="password"
						v-model="confirmPassword"
						name="confirmPassword"
						id="confirmPassword"
					/>
					<label
						:class="confirmPassword !== '' ? 'not-empty' : ''"
						for="confirmPassword"
					>Confirm Password</label>
				</div>

				<button type="submit">Update password</button>

				<p>{{ errorMsg }}</p>
			</fieldset>
		</form>

		<section>
			<button @click="deleteUser = true">Delete User</button>

			<ReAuth v-if="deleteUser" />
		</section>
	</section>
	<div v-else>
		<h1>You need to be logged in to update Your profile</h1>

		<router-link to="/">Log in</router-link>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import ReAuth from './ReAuth'
	export default {
		props: ['id'],
		components: { ReAuth },
		data() {
			return {
				form: {
					name: '',
					email: '',
					username: ''
				},
				deleteUser: false,
				updatePassword: false,
				confirmPassword: '',
				password: '',
				passwordError: ''
			}
		},

		methods: {
			...mapActions(['updateUser', 'updateUserPassword']),
			handleUpdate() {
				const userUpdateData = {}
				let count = 0
				for (const key in this.form) {
					count++
					const element = this.form[key]
					if (element !== '') {
						userUpdateData[key] = element
					}
					if (count === Object.keys(this.form).length) {
						this.updateUser(userUpdateData)
						this.form.name = ''
						this.form.username = ''
						this.form.email = ''
					}
				}
			},

			handleUpdatePassword() {
				if (this.samePassword) {
					this.updateUserPassword(this.confirmPassword)
				}
			}
		},

		computed: {
			...mapState(['user']),

			samePassword() {
				if (this.password !== '') {
					return this.password === this.confirmPassword
				} else {
					return false
				}
			},

			errorMsg() {
				if (this.confirmPassword !== '' && !this.samePassword) {
					return 'The two passwords are not identical'
				} else {
					return ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.update-password {
		fieldset {
			padding: 1em;
			transition: all 0.3s ease-in;
			position: relative;

			&::before,
			&::after {
				pointer-events: none;
				content: '';
				width: 100%;
				height: 100%;
				position: absolute;
				border: 2px solid transparent;
				z-index: 10;
			}
		}
		.correctPassword {
			&::before {
				animation: borders-top-right 0.6s ease-in;
				animation-fill-mode: forwards;
				top: -2px;
				left: -2px;
			}

			&::after {
				animation: borders-left-bottom 0.6s ease-in;
				animation-fill-mode: forwards;
				animation-delay: 0.6s;
				bottom: -2px;
				right: -2px;
			}
		}
	}

	@keyframes borders-top-right {
		0% {
			width: 0;
			height: 0;
			border-top-color: transparent;
			border-right-color: transparent;
			border-bottom-color: transparent;
			border-left-color: transparent;
		}

		50% {
			width: 100%;
			height: 0;
			border-top-color: #42b983;
		}

		100% {
			width: 100%;
			height: 100%;
			border-top-color: #42b983;
			border-right-color: #42b983;
		}
	}

	@keyframes borders-left-bottom {
		0% {
			width: 0;
			height: 0;
		}
		50% {
			width: 100%;
			height: 0;
			border-bottom-color: #42b983;
		}
		100% {
			height: 100%;
			border-bottom-color: #42b983;
			border-left-color: #42b983;
		}
	}
</style>
