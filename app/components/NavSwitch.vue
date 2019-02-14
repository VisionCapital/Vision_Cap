<template>
	<div class="nav-switch">

		<div class="wrap">

			<router-link
				to="/"
				class="home-link"
				title="Home">
				<logo class="light" :interactive="true"/>
			</router-link>

			<button v-if="!$store.state.navOpen" @click.prevent="$store.dispatch('toggleNav')">
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="15" viewBox="0 0 26 15">
					<g fill="#FFF" fill-rule="evenodd">
						<path d="M0 13.636h26V15H0z"/>
						<path d="M0 6.818h26v1.364H0z"/>
						<path d="M0 0h26v1.364H0z"/>
					</g>
				</svg>
			</button>

			<close v-else @click="$store.dispatch('toggleNav')"/>

		</div>

		<!-- <transition>
			<div class="bg" :class="{'nav-open': $store.state.navOpen}" v-if="!pageTop || $store.state.navOpen"></div>
		</transition> -->

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
	}

};

</script>

<style lang="stylus" scoped>

@import "../styl/_variables";

.nav-switch
	@extend $slice
	background none
	left 0
	position fixed
	top 0
	width 100%
	z-index 11

	.wrap
		display flex
		justify-content space-between
		pad(1,0)

	/deep/
		a::before, a::after
			content none

		button
			appearance none
			background none
			border 0
			padding 0
			mgn(0,0)
			text-align center

			svg
				display inline-block
				height 15px
				vertical-align middle
				width 26px

		canvas
			width 50%

	.close-outer.close-outer
		top: 0
		right: 0
		position relative
		height 23px
		width 23px

.bg
	position absolute
	left 0
	top 0
	background $b
	height 100%
	width 100%
	z-index -1
	transition height 0.5s

	&.v-leave-active, &.v-enter-active
		transition transform 0.5s, opacity 0.5s

	&.v-enter, &.v-leave-to
		transform translate(0,-100%)
		opacity 0

	&.nav-open
		height 100vh

</style>
