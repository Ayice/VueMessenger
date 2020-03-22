<template>
	<section class="right-section">
		<router-view></router-view>
	</section>
</template>

<script>
	// import Chatroom from '@/components/ChatRoom'
	export default {
		name: 'RightSection'
	}
</script>

<style lang="scss">
	.right-section {
		color: #fff;
		background-color: #42b983;
	}
</style>
