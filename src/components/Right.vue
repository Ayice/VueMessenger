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
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}
</style>
