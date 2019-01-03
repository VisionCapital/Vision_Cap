<template>
	<div class="main-nav">

		<div class="bg"/>

		<nav>
			<ul class="links">

				<li v-if="!$store.state.device.mobile">
					<router-link
						to="/"
						class="home-link"
						title="Home">
						<logo class="light" :interactive="true"/>
					</router-link>
				</li>

				<li v-for="link in links"
					:key="link.path">
					<router-link :to="link.path"
						:title="link.title"
						@click.native="$store.dispatch('toggleNav')"
						v-html="link.title"/>
				</li>

			</ul>
		</nav>

	</div>
</template>

<script>

import Logo from './svg/Logo.vue';

export default {

	components: {
		Logo
	},

	data() {
		let links = [];

		links = [
			{
				path: '/about/',
				title: 'About'
			},
			{
				path: '/team/',
				title: 'Team'
			},
			{
				path: '/private-funds/',
				title: 'Private Funds'
			},
			{
				path: '/mutual-funds/',
				title: 'Mutual Funds'
			},
			{
				path: '/visual-resources/',
				title: 'Visual Resources'
			},
			{
				path: '/investor-portal/',
				title: 'Investor Portal'
			},
			{
				path: '/contact-us/',
				title: 'Contact Us'
			}
		];

		return {
			links
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../styl/_variables"

.main-nav
	left 0
	position fixed
	top 0
	width 100%
	z-index 10
	+below($tablet) {
		height 100%
		pad(5,1)
	}

.bg
	background black
	abs()

.links
	margin 0
	list-style none
	padding 0
	position relative
	+above($tablet)
		text-align center

	/deep/
		a
			color white

		li
			max-width 280px
			mgn(1,.5)
			vertical-align middle
			+above($tablet)
				display inline-block
</style>
