<template>
	<div class="app">

		<router-link to="/"
			class="home-link"
			title="Home">
			<logo/>
		</router-link>

		<transition appear>
			<main-nav v-if="$store.state.navOpen"/>
		</transition>

		<transition appear>
			<router-view :key="$route.fullPath"/>
		</transition>

		<nav-switch/>

	</div>
</template>

<script>

import Logo from './svg/Logo.vue';
import MainNav from './MainNav.vue';
import NavSwitch from './NavSwitch.vue';

export default {
	components: {
		Logo,
		MainNav,
		NavSwitch
	}
};

</script>

<style lang="stylus" scoped>

@import "../styl/_variables"

.app
	height 100%

.home-link
	display block
	left 0
	pad(1,1)
	position fixed
	top 0
	max-width ($desktop / 8)
	width (100% / 8)
	z-index 11

	+above($desktop)
		margin-left ($desktop / -2)
		left 50%

	/deep/ svg
		display block

</style>