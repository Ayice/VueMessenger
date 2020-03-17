<template>
	<div class="friends">
		<p>This is your friendlist</p>
		<div v-for="friend in user.friends" :key="friend.id">
			<router-link :to="'/profile/' + friend.id">
				<p>{{friend.username}} | {{friend.email}}</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'Friends',
		computed: {
			...mapState(['user'])
		}
	}
</script>

<style>
</style>