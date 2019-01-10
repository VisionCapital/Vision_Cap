<template>
	<div class="app">

		<router-link v-if="$store.state.device.mobile"
			to="/"
			class="home-link"
			title="Home">
			<logo class="light"/>
		</router-link>

		<transition appear>
			<main-nav 
				:pageTop="pageTop"
				v-if="($store.state.device.win.x > 1024) || $store.state.navOpen"
			/>
		</transition>

		<transition appear>
			<router-view @pageTop="pageTop = $event" :key="$route.fullPath"/>
		</transition>

		<nav-switch v-if="$store.state.device.win.x <= 1024"/>

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
	},
	data() {
		return {
			pageTop: false
		};
	},
	beforeCreate() {
		// console.log(this.$cms.findRecord('resources'));
		this.$cms.loadType('navigation').then((results) => {
			// console.log(results.results[0]);
			this.$store.dispatch('setNavData', results.results[0]);
		});
		// this.$cms.loadType('resources').then((results) => {
		// 	console.log(results.results);
		// 	this.$store.dispatch('setNavData', results.results[0]);
		// });
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