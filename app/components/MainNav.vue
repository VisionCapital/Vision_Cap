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
				path: '/properties/the-torontonian',
				title: 'The Torontonian'
			},
			{
				path: '/properties/balliol-park',
				title: 'Balliol Park'
			},
			{
				path: '/properties/lillian-park',
				title: 'Lillian Park'
			},
			{
				path: '/about/',
				title: 'About'
			},
			{
				path: '/contact/',
				title: 'Contact'
			},
			{
				path: '/careers/',
				title: 'Careers'
			},
			{
				path: '/residents/',
				title: 'Residents'
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
	background $bg
	abs()
	pad(3,3)
	position fixed
	z-index 10

.links
	margin 0
	list-style none
	padding 0

	li
		display block

	a
		color $red
		font-family $integral

		&.router-link-exact-active
			color $blk

</style>
