<template>
	<form @submit.prevent="deleteUser(form)" class="reauth-form">
		<fieldset>
			<legend>Verify that it's {{ user.username }}</legend>

			<div class="input-control">
				<input
					id="reAuthEmail"
					type="email"
					name="email"
					v-model="form.email"
					required
				/>
				<label :class="form.email !== '' ? 'not-empty' : ''" for="reAuthEmail"
					>Email</label
				>
			</div>

			<div class="input-control">
				<input
					id="reAuthPassword"
					type="password"
					name="password"
					v-model="form.password"
					required
				/>
				<label
					:class="form.password !== '' ? 'not-empty' : ''"
					for="reAuthPassword"
					>Password</label
				>
			</div>

			<button type="submit">Delete Account</button>
			<button type="button" @click="$emit('cancelRemove')">Cancel</button>
		</fieldset>
	</form>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	export default {
		name: 'ReAuthenticate',
		data() {
			return {
				form: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			...mapActions(['deleteUser'])
		},
		computed: {
			...mapState(['user'])
		}
	}
</script>

<style lang="scss">
	.reauth-form {
		position: absolute;
		top: 25%;
		left: 50%;
		-webkit-transform: translate(-50%, -25%);
		transform: translate(-50%, -25%);
		z-index: 10;
		width: 50%;
		padding: 1em;
		background-color: #fff;
		box-shadow: 0px 5px 8px #0f0f0f;
	}
</style>
