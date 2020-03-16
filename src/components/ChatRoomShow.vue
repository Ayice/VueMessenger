<template>
	<div class="chatroom">
		<router-link :to="'/chatroom/' + chatroom.id">
			<p class="h2">{{chatroom.name}}</p>
		</router-link>
		<span @click="removeChatroom(chatroom)">X</span>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'ChatroomShow',
		props: { chatroom: Object },

		methods: {
			...mapActions(['removeChatroom'])
		}
	}
</script>

<style lang="scss">
	.chatroom {
		background-color: #ffffff;
		color: #000000;
		display: flex;
		justify-content: center;
		align-items: center;

		& > * {
			margin: 0 1em;
		}
	}
</style>