<template>
	<div class="app">

		<main-nav
			v-if="($store.state.device.win.x > 1024) || $store.state.navOpen"
			:pageTop="pageTop"
		/>

		<transition appear mode="out-in" duration="1000">
			<div class="stripes-bg"
				:key="$route.fullPath"/>
		</transition>

		<transition appear mode="out-in" duration="1000">
			<router-view
				@pageTop="pageTop = $event"
				:key="$route.fullPath"/>
		</transition>

		<nav-switch v-if="$store.state.device.win.x <= 1024" :pageTop="pageTop"/>

		<transition appear mode="out-in" duration="1000">
			<div class="wipe"
				:key="$route.fullPath"/>
		</transition>

	</div>
</template>

<script>

import MainNav from './MainNav.vue';
import NavSwitch from './NavSwitch.vue';
// import HeroBackground from './HeroBackground.vue';

export default {
	components: {
		// HeroBackground,
		MainNav,
		NavSwitch
	},

	watch: {
		$route() {
			this.pageTop = true;
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

		let resourceTags = [];

		this.$cms.loadPage('resources').then((results) => {
			for (let r = 0; r < results.data.body.length; r++) {
				if (results.data.body[r].slice_type === 'resources') {
					let title = this.$cms.textField(results.data.body[r].primary.title_tag);
					let slug = title.replace(/\s/g, '-').toLowerCase();

					resourceTags.push({
						title: title,
						slug: slug
					});
				}
			}
			this.$store.dispatch('setResourceTags', resourceTags);
		});

	}
};

</script>

<style lang="stylus">

@import "../styl/_variables"

.app
	background linear-gradient(120deg, #071559, #030532)

.stripes-bg
	background url('../images/strip-bg.jpg')
	background-repeat no-repeat
	background-size cover
	abs()
	left -3%
	width 103%
	position fixed
	opacity 1
	transform translate3d(0%, 0, 0)
	transition transform 750ms $easeOutCubic
	transition-property opacity, transform
	z-index 0

	&.v-enter, &.v-leave-to
		opacity 0

	&.v-enter
		transform translate3d(3%, 0, 0)

	&.v-enter-active
		transition-delay 125ms

	&.v-leave-active
		transition-duration 0ms
		transition-delay 1000ms

.wipe
	background linear-gradient(120deg, #071559, #030532)
	abs()
	position fixed
	pointer-events none
	transform translate3d(0, 100%, 0)
	transition transform 1000ms $easeOutQuint
	z-index 9

	&.v-leave-to
		transform translate3d(0, 0%, 0)

</style>