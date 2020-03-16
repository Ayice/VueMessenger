<template>
  <div class="home">
    <LeftSection />
    <RightSection />
  </div>
</template>

<script>
	import LeftSection from '../components/Left'
	import RightSection from '../components/Right'
	export default {
		name: 'Home',
		components: { LeftSection, RightSection }
	}
</script>

<style lang="scss">
	.home {
		width: 100%;
		display: flex;
		flex: 1 50%;
		height: 100vh;

		& > section {
			width: 50%;
			height: 100%;
		}
	}
</style>
