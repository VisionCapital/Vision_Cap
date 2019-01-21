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
						<router-link :to="`/${link.page_link.slug}`" v-if="link.link_type === 'normal'"
							:title="link.link_title[0].text"
							v-html="link.link_title[0].text"/>

						<div class="drop-toggle" v-if="link.link_type === 'dropdown'">	
							<router-link v-html="link.link_title[0].text"
								:to="`/${link.page_link.slug}`"
							/>
							<arrow-head
								@click.native="mutualOpen = !mutualOpen"
								class="arrow-head"
								:pointDown="!mutualOpen"
								color="#fff"
							/>
						</div>
						<div class="dropdown" v-if="mutualOpen && link.link_type === 'dropdown'">
							<router-link :to="`/${link.page_link.slug}#${tag.slug}`"
								v-for="(tag, idx) in resourceTags"
								v-html="tag.title"
								:class="tag.slug"
								:key="idx"/>
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

		let links = [];

		links = this.$store.state.navData.links;
		let resourceTags = this.$store.state.resourceTags;

		let mutualDrop = {
			path: '/resources',
			title: 'Resources'
		};

		return {
			links,
			mutualOpen: false,
			resourceTags,
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
	// overflow hidden
	z-index 2
	+below($tablet)
		pad(1,1)

.links
	margin 0 auto
	list-style none
	padding 0
	position relative
	text-align center
	display flex
	flex-wrap wrap
	justify-content center
	max-width 1060px
	width 80%

	/deep/ a
		color white

	/deep/ li
		max-width 280px
		margin 0
		position relative
		pad(1,.5)
	
		&:first-child
			+above($tablet)
				padding-left 0
				margin-right auto

			+below($tablet)
				max-width 100%
				width auto
				padding 0 24%
			+below($mobile)
				padding 0


.arrow-head
	margin-left 1em
	display inline-block
.drop-toggle
	display flex;
	cursor pointer

.dropdown
	display flex
	flex-direction column
	position absolute
	bottom 100%
	a
		margin-bottom 2px
		pad(0.5,0.5)
		background $blue
		&:hover::after, &:hover::before
			display none
</style>
