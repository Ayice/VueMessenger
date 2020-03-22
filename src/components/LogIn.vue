<template>
	<section class="login" v-if="user == null">
		<h1>Log in</h1>
		<form @submit.prevent="login(form)">
			<label>
				E-mail address
				<input type="email" name="email" v-model="form.email" required />
			</label>

			<label>
				Password
				<input type="password" name="password" v-model="form.password" required />
			</label>

			<button type="submit">Log in</button>
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