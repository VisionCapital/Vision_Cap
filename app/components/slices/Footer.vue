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
						<div class="drop-toggle" @click="mutualOpen = !mutualOpen">
							<div v-html="mutualDrop.title"></div>
							<arrow-head
								class="arrow-head"
								:pointDown="!mutualOpen"
								color="#fff"
							/>
						</div>
						<div class="dropdown" v-if="mutualOpen">
							<router-link :to="`/resources#${tagID}`" 
								v-for="(tagID, name) in resourceTags" 
								v-html="name" 
								:class="tagID"
								:key="tagID"/>
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
			path: '/visual-resources/',
			title: 'Resources'
		};

		return {
			links,
			mutualOpen: false,
			mutualDrop,
			resourceTags
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
	+below($tablet)
		pad(1,1)

.links
	margin 0
	list-style none
	padding 0
	position relative
	text-align center
	display flex
	flex-wrap wrap
	justify-content center
	// +above($mobile)
	// 	text-align center
	// 	display flex
	// 	flex-wrap wrap
	// 	justify-content center
	/deep/ a
		color white

	/deep/ li
		max-width 280px
		margin 0
		pad(1,.5)
		vertical-align middle
		// +below($mobile)
		// 	display inline-block
		// 	width 40%
		// 	mgn(.5,.5)
		&:first-child
			+below($tablet)
				max-width 100%
				width auto
				padding 0 24%
			+below($mobile)
				padding 0
		&:nth-child(n+6)
			order 7

.links /deep/ li.resources 
	order 6

.resources
	position relative
	.arrow-head 
		margin-left 1em

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
