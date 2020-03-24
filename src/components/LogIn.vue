<template>
	<section class="login" v-if="user == null">
		<form @submit.prevent="login(form)">
			<fieldset>
				<legend>Log in</legend>

				<div class="input-control">
					<label for="email">E-mail address</label>
					<input id="email" type="email" name="email" v-model="form.email" required />
				</div>

				<div class="input-control">
					<label for="password">Password</label>
					<input type="password" name="password" v-model="form.password" required id="password" />
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
