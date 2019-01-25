<template>
	<div class="footer">

		<div class="bg"/>

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
						:key="link.path"
						:class="link.link_type">

						<router-link v-if="link.link_type === 'normal'"
							:to="`/${link.page_link.slug}`"
							:title="link.link_title[0].text"
							v-html="link.link_title[0].text"/>

						<div class="drop-toggle" v-if="link.link_type === 'dropdown'">

							<router-link :to="`/${link.page_link.slug}`"
								v-html="link.link_title[0].text"/>

							<button v-if="$store.state.device.win.x > 1024"
								@click.prevent="mutualOpen = !mutualOpen">
								<arrow-head
									class="arrow-head"
									:pointDown="mutualOpen"
									color="#fff"/>
							</button>

						</div>

						<div class="anchor-links" v-if="mutualOpen && link.link_type === 'dropdown' && $store.state.device.win.x > 1024">
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

	computed: {
		links() { return this.$store.state.navData.links; },
		resourceTags() { return this.$store.state.resourceTags; }
	},

	data() {
		let mutualDrop = {
			path: '/resources',
			title: 'Resources'
		};

		return {
			mutualOpen: false,
			mutualDrop
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.footer
	background $bg
	left 0
	top 0
	width 100%
	z-index 10

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
	display inline-block
	margin 0 auto

	&::before, &::after
		content none

.footer
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

.bg
	background $blue
	abs()
	transition transform 300ms $easeOutQuint

	.v-enter &, .onpage:not(.inview) &
		transform translate3d(0, 100%, 0)

.links
	display flex
	justify-content center
	list-style none
	margin 0 auto
	max-width 1060px
	padding 0
	position relative
	text-align center
	width 80%

	+below($notebook)
		width 376px
		margin auto
		flex-wrap wrap

	+below($mobile)
		display inline-block
		width auto

	/deep/
		a
			color $w
			display inline-block
			font-smoothing()
			vertical-align top

			+below($mobile)
				fs(16)
				line-height 8px


		li
			max-width 280px
			margin auto 0
			pad(1,.5)
			position relative
			transition transform 0.5s, opacity 0.5s

			for i in 1..10
				&:nth-child({i})
					transition-delay 75ms * (i - 1) + 0.3s

			.v-enter &, .onpage:not(.inview) &
				transform translate(0,50%)
				opacity 0

			+below($mobile)
				column-count 2
				width 40%
				float left
				text-align left
				padding-bottom: 4px;

			+below($laptop)
				fs(10.5)
				mgn(0,0)

	.dropdown
		padding 0

	.logo
		/deep/ a
			&::before, &::after
				background none

		+above($notebook)
			margin-right auto
			padding-left 0

		+below($notebook)
			max-width 100%
			width 100%

		+below($mobile)
			display flex
			padding-bottom 2rem
			max-width 90%

	.arrow-head
		display block
		width 1em

		.drop-toggle
			// display flex;
			// display inline-block
			// align-items flex-start
			cursor pointer
			+above($notebook)
				height 100%
				pad(1,.5)

.drop-toggle
	+above($notebook)
		pad(1,0,1,.5)

	/deep/
		a, button
			display inline-block
			vertical-align middle

		button
			border 0
			margin 0
			padding 0

			+above($notebook)
				pad(.5,.25)

.anchor-links
	bottom 100%
	left $gut*-.5rem
	position absolute
	right $gut*-.5rem

	/deep/ a
		background $blue
		display block
		margin-bottom 2px
		pad(0.5,0.5)

		&:hover::after, &:hover::before
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
