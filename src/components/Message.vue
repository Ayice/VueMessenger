<template>
	<div class="message-container">
		<p class="message">
			{{ message.sender }} :
			{{ message.message }}
		</p>
	</div>
</template>

<script>
	export default {
		name: 'Message',
		props: ['message']
	}
</script>

<style lang="scss" >
	.message-container {
		width: fit-content;
		padding: 15px;
		border-radius: 15px;
		margin-bottom: 0.5em;
		color: #333;

		&.author {
			align-self: flex-end;
			background-color: #42b983;
		}

		&.receiver {
			align-self: flex-start;
			background-color: #59a080;
		}

		.message {
			margin: 0;
			font-size: 13px;
		}
	}
</style>
