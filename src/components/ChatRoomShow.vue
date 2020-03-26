<template>
	<router-link class="chatroom-link" :to="{name: 'Chatroom', params: {id: chatroom.id}}">
		<div>
			<p class="h2">{{chatroom.name}}</p>
			<ul>
				<li v-for="member in chatroom.members" :key="member.id">{{member.username}}</li>
			</ul>
			<p class="last-message">
				<b v-if="chatroom.lastSender === user.id">You:</b>
				{{ chatroom.lastMessage }}...
			</p>
			<span class="remove" @click="removeChatroom(chatroom)">X</span>
		</div>
	</router-link>
</template>

<script>
	import { mapActions, mapState } from 'vuex'

	export default {
		name: 'ChatroomShow',
		props: { chatroom: Object },

		methods: {
			...mapActions(['removeChatroom'])
		},
		computed: mapState(['user'])
	}
</script>

<style lang="scss">
	.chatroom-link {
		position: relative;
		background-color: #ffffff;
		color: #000000;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 2em;
		text-decoration: none;

		&::after {
			content: '';
			position: absolute;
			bottom: -10%;
			width: 80%;
			height: 1px;
			background: rgb(151, 151, 151);
		}

		& > * {
			margin: 0 1em;
		}

		.h2 {
			flex: 1 0 100%;
			text-align: center;
			text-decoration: none;
		}

		.remove {
			position: absolute;
			right: 2%;
			top: 50%;
		}

		.last-message {
			flex: 1 0 100%;
			text-align: center;
			font-size: 0.8em;
			color: #000;
			text-decoration: none;
			border-bottom: none;
		}
	}
</style>
