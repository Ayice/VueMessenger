<template>
	<section class="login" v-if="user == null">
		<form @submit.prevent="login(form)">
			<fieldset>
				<legend>Log in</legend>

				<div class="input-control">
					<input id="email" type="email" name="email" v-model="form.email" required />
					<label :class="form.email !== '' ? 'not-empty' : ''" for="email">E-mail address</label>
				</div>

				<div class="input-control">
					<input id="password" type="password" name="password" v-model="form.password" required />
					<label :class="form.password !== '' ? 'not-empty' : ''" for="password">Password</label>
				</div>

				<button type="submit">Log in</button>
			</fieldset>
		</form>
	</section>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	export default {
		name: 'Login',
		data() {
			return {
				form: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			...mapActions(['login'])
		},
		computed: {
			...mapState(['user'])
		}
	}
</script>

<style>
</style>
