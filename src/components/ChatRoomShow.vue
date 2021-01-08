<template>
	<router-link
		class="chatroom-link"
		:to="{ name: 'Chatroom', params: { id: chatroom.id } }"
		tag="div"
	>
		<span class="chatroom-img" v-if="chatroom.members[0].avatarUrl">
			<img
				v-for="member in chatroom.members"
				:src="member.avatarUrl"
				:alt="member.username"
				:key="member.id"
			/>
		</span>
		<div class="chatroom-text">
			<p class="h2">{{ chatroom.name }}</p>

			<p class="last-message">
				<b v-if="chatroom.lastSender === user.id">You:</b>
				{{ chatroom.lastMessage }}...
			</p>
		</div>
		<span class="remove" @click.stop="leaveChatroom(chatroom)">X</span>
	</router-link>
</template>

<script>
	import { mapActions, mapState } from 'vuex'

	export default {
		name: 'ChatroomShow',
		props: { chatroom: Object },

		methods: {
			...mapActions(['leaveChatroom'])
		},
		computed: mapState(['user'])
	}
</script>

<style lang="scss" scoped>
	.remove {
		padding: 2%;
		width: 20px;
		margin: 0;
		text-align: center;
		border-radius: 50%;
		transition: all 0.3s ease-in;
		&:hover {
			background-color: #bfbfbf57;
		}
	}
	.chatroom-img {
		display: block;
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;

		img {
			height: 50%;
			width: 50%;
		}
	}

	.chatroom-link {
		justify-content: space-between;
		padding: 0.5em;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
		color: #000000;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

		&:hover {
			box-shadow: 2px 5px 6px rgba(129, 129, 129, 0.4);
		}

		.chatroom-text {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			p {
				margin: 0;
			}
			.h2 {
				text-decoration: none;
			}
		}

		.last-message {
			text-align: center;
			font-size: 0.8em;
			color: #000;
			text-decoration: none;
			border-bottom: none;
		}
	}
</style>
