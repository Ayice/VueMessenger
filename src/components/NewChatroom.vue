<template>
	<section class="form">
		<form @submit.prevent="addNewChatroom">
			<fieldset>
				<legend>Create new chatroom!</legend>

				<div class="input-control">
					<input
						id="chatroomName"
						:class="newChatroom !== '' ? 'not-empty' : ''"
						type="text"
						v-model="newChatroom"
						name="chatroomName"
						required
					/>
					<label :class="newChatroom !== '' ? 'not-empty' : ''" for="chatroomName">Chatroom Name</label>
				</div>

				<button type="submit">Create Chatroom</button>
			</fieldset>
		</form>
	</section>
</template>

<script>
	// import { eventBus } from '../main'
	import { mapActions } from 'vuex'

	export default {
		name: 'New-Chatroom',

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

<style lang="scss" scoped>
</style>
