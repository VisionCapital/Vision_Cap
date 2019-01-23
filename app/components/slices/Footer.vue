<template>
	<div class="footer">
		<footer>
			<nav>
				<ul class="links">

					<li class="logo">
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
								:pointDown="mutualOpen"
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

div.footer

	display block
.footer
	left 0
	position fixed
	top 0
	width 100%
	z-index 10

	display block
	+below($notebook)
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
			padding 0
			mgn(0,0)
			text-align center

			svg
				display inline-block
				vertical-align middle
	+below($tablet)
		padding-bottom 5vw

.logo-outer
	max-width: 280px;
	width 100%
	height 100%

	+below(1024px)
		position relative
		max-width: 210px;
		height 100%

.home-link
	margin 0 auto
	display inline-block


.footer
	background $blue
	color $w
	position relative
	// overflow hidden
	z-index 2
	+below($tablet)
		pad(1,1)
.linkwrap
	vertical-align middle
	float right
	display inline-block
	margin auto 0
	li
		&:first-child
			+above($tablet)
				padding-left auto
	// column-count 2
.links
	margin 0 auto
	display flex
	list-style none
	padding 0
	position relative
	text-align center
	justify-content center
	max-width 1060px
	width 80%

	+below($notebook)
		width 376px
		margin auto
		flex-wrap wrap
	+below($mobile)
		display inline-block
		width auto


	/deep/ a
		color $w
		font-smoothing()

		+below($mobile)
			fs(16)
			line-height 8px
	li
		max-width 280px
		white-space nowrap
		margin auto 0
		position relative
		display flex
		flex-direction column
		display inline
		pad(1,.5)
		fs(14)

		+below($mobile)
			column-count 2
			width 40%
			float left
			text-align left
			padding-bottom: 4px;

		+below($laptop)
			fs(10.5)
			mgn(0,0)

		// &:nth-child(1) //starts next line after the logo
		// 	&:after
		// 		content ''
		// 		margin-bottom 2rem
		// 		display flex

		// &:nth-child(4n)//starts next line after every 4
		// 	&:after
		// 		content ''
		// 		display flex

		// &:first-child
		// 	+above($tablet)
		// 		padding-left 0
		// 		margin-right auto

		// 	+below($tablet)
		// 		max-width 100%
		// 		width auto
		// 	+below($mobile)
		// 		padding 0

	.logo
		/deep/ a
			&::before, &::after
				background none

		+below($notebook)
			width 100%
			max-width 100%
		+below($mobile)
			display flex
			padding-bottom 2rem
			max-width 90%
		+above($notebook)
			margin-right auto
			padding-left 0

	.arrow-head
		margin-left 0.4vw
		display inline-block
		+below($notebook)
			margin: 0 0 0 .5em
			width 0.75em

		.drop-toggle
			// display flex;
			// display inline-block
			// align-items flex-start
			cursor pointer
			+above($notebook)
				height 100%
				pad(1,.5)

	svg
		width: 1em;
.drop-toggle
	display inline
	cursor pointer

	pad(0,0)
	/deep/ a:after, a:before
		top 22px

.dropdown
	display flex
	// flex-direction column
	position absolute
	bottom 100%

	a
		margin-bottom 2px
		pad(0.5,0.5)
		background $blue
		&:hover::after, &:hover::before
			display none


.home-link 
	&:before, &:after
		display none

a.router-link-exact-active, .drop-toggle .router-link-active
	&:before
		width 100%
		left 0
		transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1)

	&:after
		transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1)
		width 100%
		background none

	&:hover
		&::before
			background none

			width 0%

		&::after
			background $w
			right 0
			transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1)
			width 0%
</style>
