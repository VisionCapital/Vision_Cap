<template>
	<div class="nav-switch">

		<router-link
			to="/"
			class="home-link"
			title="Home">
			<logo class="light" :interactive="interactive"/>
		</router-link>

		<button v-if="!$store.state.navOpen" @click.prevent="$store.dispatch('toggleNav')">
			<svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17">
				<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="square">
					<path d="M.5.5h22M4 8.5h15M.5 16.5h22"/>
				</g>
			</svg>
		</button>
		
		<close v-else @click="$store.dispatch('toggleNav')"/>

		<transition>
			<div class="bg" :class="{'nav-open': $store.state.navOpen}" v-if="!pageTop || $store.state.navOpen"></div>
		</transition>

	</div>
</template>

<script>

import Logo from './svg/Logo.vue';
import Close from './svg/Close.vue';

export default {
	props: [
		'pageTop'
	],
	components: {
		Logo,
		Close
	},

	computed: {
		interactive() {
			return /Chrome/.test(navigator.userAgent);
		}
	}

};

</script>

<style lang="stylus" scoped>

@import "../styl/_variables";


.nav-switch
	// background $b
	position fixed
	width 100%
	right 0
	top 0
	z-index 11
	display flex
	justify-content space-between
	// align-items center
	pad(1,1)

	a:after
		background:none

	a:before
		background:none

	/deep/ button
		appearance none
		background none
		border 0
		mgn(0,0)
		text-align center

		svg
			display inline-block
			vertical-align middle

.home-link
	width 70%

.home-link.router-link-exact-active.router-link-active
	width 20rem

.bg 
	position absolute
	left 0
	top 0
	background $b
	height 100%
	width 100%
	z-index -1
	transition height 0.5s
	&.nav-open
		height 100vh
</style>
