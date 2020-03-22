<template>
	<div class="home">
		<LeftSection />
		<RightSection v-if="user" />
	</div>
</template>

<script>
	import LeftSection from '../components/Left'
	import RightSection from '../components/Right'

	import { mapState } from 'vuex'
	export default {
		name: 'Home',
		components: { LeftSection, RightSection },
		computed: mapState(['user'])
	}
</script>

<style lang="scss">
	.home {
		display: flex;
		width: 100%;
		height: 100vh;
		justify-content: center;

		& > * {
			width: 50%;
		}
	}
</style>
