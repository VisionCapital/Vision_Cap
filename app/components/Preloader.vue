<template>
	<div class="preloader">
		<div class="logo">
			<logo class="full"/>
		</div>
	</div>
</template>

<script>

import Logo from './svg/Logo.vue';

export default {
	components: {
		Logo
	}
};
</script>

<style lang="stylus" scoped>

@import "../styl/_variables";

.preloader
	background: $w
	height: 100%
	left: 0
	position: fixed
	top: 0
	width: 100%
	z-index: 12
	transition: opacity 500ms $easeInOutCubic

	&.v-leave-to
		opacity: 0

.logo
	left 50%
	position absolute
	transform translate3d(-50%,-50%,0)
	transition transform 500ms $easeInOutCubic
	top 50%

	.logo-outer /deep/ svg
		height (268 / 2040) * 50vw
		width 50vw

</style>
