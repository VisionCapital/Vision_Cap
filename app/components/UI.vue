<template>
	<div class="app">

		<router-link v-if="$store.state.device.mobile"
			to="/"
			class="home-link"
			title="Home">
			<logo class="light"/>
		</router-link>

		<transition appear>
			<main-nav/>
		</transition>

		<transition appear>
			<router-view :key="$route.fullPath"/>
		</transition>

		<nav-switch v-if="$store.state.device.mobile"/>


	</div>
</template>

<script>

import Logo from './svg/Logo.vue';
import MainNav from './MainNav.vue';
import NavSwitch from './NavSwitch.vue';
import Hero from './slices/Hero.vue';

export default {
	components: {
		Logo,
		MainNav,
		NavSwitch,
		Hero
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