<template>
	<div class="app">

		<!-- why does this exist? -->
		<!-- <router-link v-if="$store.state.device.mobile"
			to="/"
			class="home-link"
			title="Home">
			<logo class="light" :interactive="interactive"/>
		</router-link> -->

		<main-nav
			v-if="($store.state.device.win.x > 1024) || $store.state.navOpen"
			:pageTop="pageTop"
		/>

		<router-view @pageTop="pageTop = $event" :key="$route.fullPath"/>

		<nav-switch v-if="$store.state.device.win.x <= 1024" :pageTop="pageTop"/>

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

	computed: {
		interactive() {
			return true; // /Chrome/.test(navigator.userAgent);
		}
	},

	data() {
		return {
			pageTop: true
		};
	},
	beforeCreate() {
		this.$cms.loadType('navigation').then((results) => {
			this.$store.dispatch('setNavData', results.results[0].data);
		});
		this.$cms.loadType('resource').then((results) => {
			let resourceTitles = {};
			let resourceTags = [];
			// there's probably a better way to remove duplicate tags than this
			for (let resource of results.results) {
				resourceTitles[resource.tags[0]] = resource.tags[0].replace(/\s/g, '-').toLowerCase();
			}
			for (let title in resourceTitles) {
				if (title) {
					resourceTags.push({
						title: title,
						slug: resourceTitles[title]
					});
				}
			}
			this.$store.dispatch('setResourceTags', resourceTags);
		});

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
	position fixed
	top 0
	z-index 11

	+above($desktop)
		margin-left ($desktop / -2)
		left 50%

	/deep/ svg
		display block

</style>