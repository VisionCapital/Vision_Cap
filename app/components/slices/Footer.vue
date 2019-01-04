<template>
	<div class="footer">
		<footer>
			<nav>
				<ul class="links">

					<li>
						<router-link
							to="/"
							class="home-link"
							title="Home">
							<logo class="light"/>
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
		</footer>
	</div>
</template>

<script>

import Logo from '../svg/Logo.vue';

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

@import "../../styl/_variables"

.footer
	background $blue
	color $w
	position relative
	overflow hidden
	+below($tablet)
		pad(1,1)

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
			display inline-block
			max-width 280px
			mgn(1,.5)
			vertical-align middle
			+below($tablet)
				width 40%
				mgn(.5,.5)
				&:first-child
					max-width 100%
					width auto
</style>
