<template>
	<div class="main-nav">
		<nav>
			<ul class="links">

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

export default {
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
@import "../styl/_global"

.main-nav
	left (100% / 8)
	position fixed
	top 0
	z-index 10

.links
	margin 0
	list-style none
	padding 0
	background-color black

	a
		color white

	li
		display inline-block !important
		mgn(1,.5) !important
		vertical-align middle !important

</style>
