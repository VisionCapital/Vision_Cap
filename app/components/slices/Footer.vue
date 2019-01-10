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
						<router-link :to="`/${link.page_link.slug}`"
							:title="link.link_title[0].text"
							v-html="link.link_title[0].text"/>
					</li>

					<li class="resources">
						<div class="drop-toggle" 
							v-html="mutualDrop.title"
							@click="mutualOpen = !mutualOpen"
						></div>
						<arrow-head
							class="arrow-head"
							:pointDown="mutualOpen"
							color="#fff"
						/>
						<div class="dropdown" v-if="mutualOpen">
							<div></div>
						</div>
					</li>

				</ul>
			</nav>
		</footer>
	</div>
</template>

<script>

import Logo from '../svg/Logo.vue';
import ArrowHead from '../svg/ArrowHead.vue';
export default {

	components: {
		Logo,
		ArrowHead
	},

	data() {
		// console.log('footer');
		// console.log(this.$store.state.navData);
		let links = [];

		links = this.$store.state.navData.links;

		let mutualDrop = {
			path: '/visual-resources/',
			title: 'Visual Resources'
		};

		return {
			links,
			mutualOpen: false,
			mutualDrop
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
	+above($mobile)
		text-align center
		display flex
		flex-wrap wrap
		justify-content center
		align-items center

	/deep/ a
		color white

	/deep/ li
		max-width 280px
		mgn(1,.5)
		vertical-align middle
		+below($mobile)
			display inline-block
			width 40%
			mgn(.5,.5)
		&:first-child
			+below($tablet)
				max-width 100%
				width auto
				padding 0 24%
			+below($mobile)
				padding 0
.resources
	display flex
	.drop-toggle
		cursor pointer
		margin-right 1em

</style>
