<template>
	<div class="app">

		<main-nav
			v-if="($store.state.device.win.x > 1024) || $store.state.navOpen"
			:pageTop="pageTop"
		/>

		<router-view @pageTop="pageTop = $event" :key="$route.fullPath"/>

		<nav-switch v-if="$store.state.device.win.x <= 1024" :pageTop="pageTop"/>

		<transition appear>
			<div class="zish"
				:key="$route.fullPath"/>
		</transition>

	</div>
</template>

<script>

import MainNav from './MainNav.vue';
import NavSwitch from './NavSwitch.vue';

export default {
	components: {
		MainNav,
		NavSwitch
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

.zish
	background $darkblue
	background linear-gradient(120deg, #071559, #030532)
	bottom 0
	height 100%
	left 0
	position fixed
	width 100%
	z-index 9

</style>