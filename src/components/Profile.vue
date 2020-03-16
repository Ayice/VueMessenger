<template>
	<section class="profile">
		<div class="profile-pic">
			<img src alt="profile pic" />
		</div>

		<div class="profile-info">
			<h1>{{user.name}}</h1>
			<h2>aka. {{user.username}}</h2>
		</div>

		<Chatrooms class="chatrooms" />
	</section>
</template>

<script>
	import { mapState } from 'vuex'
	import Chatrooms from './ChatRooms'

	export default {
		name: 'Profile',
		components: { Chatrooms },
		computed: {
			...mapState(['user'])
		}
	}
</script>

<style lang="scss" scoped>
	.profile {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;

		&-pic {
			width: 20%;

			img {
				width: 75%;
				height: auto;
			}
		}

		&-info {
			width: 80%;
		}
	}
</style>