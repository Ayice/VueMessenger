<template>
	<div v-if="status === 'loading'">
		<h1>Loading</h1>
	</div>

	<section v-else class="users">
		<p class="title">Friend Suggestions</p>
		<UserView
			v-for="user in allUsers"
			:key="user.id"
			:remove="false"
			:user="user"
			:chatroom="false"
		/>
	</section>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import UserView from './UserView.vue'
	export default {
		props: ['id'],
		components: { UserView },
		name: 'DisplayUsers',
		data() {
			return {}
		},

		methods: {
			...mapMutations(['setModal', 'setShowModal'])
		},

		computed: {
			...mapState(['allUsers', 'user', 'status'])
		},

		mounted() {
			this.$store.dispatch('allUsers')
		}
	}
</script>

<style lang="scss">
	.users {
		width: 20%;

		.friend {
			width: 100%;
		}
	}
</style>
