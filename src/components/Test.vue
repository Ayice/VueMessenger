<template>
	<form @submit.prevent="uploadAvatar" class="avatar-form">
		<div class="input-control">
			<input type="file" name="avatar" id="avatar" @change="avatarUpload" />
			<label for="avatar">Upload profile Picture</label>
		</div>
		<button type="submit">Test</button>
	</form>
</template>

<script>
	import { mapMutations, mapActions } from 'vuex'

	export default {
		name: 'Test',
		methods: {
			...mapMutations(['avatarUpload']),
			...mapActions(['uploadAvatar'])
		}
	}
</script>

<style lang="scss">
	.avatar-form {
		input {
			+ label {
				position: relative;
			}
		}
	}
</style>
