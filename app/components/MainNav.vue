<template>
	<div class="main-nav">

		<transition appear>
			<div :class="[ 'bg', { 'nav-open' : $store.state.navOpen }]" v-if="($store.state.device.win.x < 1366 && $store.state.navOpen) || !pageTop"/>
		</transition>

		<div class="nav-content" v-if="$store.state.navData && ($store.state.device.win.x >= 1366 || $store.state.navOpen)">
			<nav>
				<ul :class="[ 'links', { 'bg-links' : !pageTop }]">

					<li v-if="$store.state.device.win.x > 1366"
						class="home-link">
						<router-link
							to="/"
							@click.native="handleClick()"
							title="Home">
							<logo class="light" :interactive="true"/>
						</router-link>
					</li>

					<li v-for="link in links"
						:key="link.page_link.slug"
						:class="link.link_type">

						<router-link v-if="link.page_link.slug && link.link_type === 'normal'"
							:to="`/${link.page_link.slug}`"
							:title="link.link_title[0].text"
							@click.native="handleClick()"
							v-html="link.link_title[0].text"/>

						<div class="dropdown-container" v-if="link.page_link.slug && link.link_type === 'dropdown'">

							<div class="drop-toggle">

								<router-link :to="`/${link.page_link.slug}`"
									@click.native="handleClick()"
									v-html="link.link_title[0].text"/>

								<button @click.prevent="mutualOpen = !mutualOpen">
									<arrow-head class="arrow-head"
										:pointDown="!mutualOpen"
										color="#fff"/>
								</button>

							</div>

							<div class="anchor-links" :class="{ 'page-top': !pageTop }">
								<transition v-for="(tag, idx) in $store.state.resourceTags" :key="idx" appear>
									<router-link v-if="mutualOpen"
										:to="`/${link.page_link.slug}#${tag.slug}`"
										@click.native="handleClick()">
										<div class="text"
											v-html="tag.title">
										</div>
									</router-link>
								</transition>
							</div>

						</div>

					</li>

				</ul>
			</nav>
		</div>

	</div>
</template>

<script>

import Logo from './svg/Logo.vue';
import ArrowHead from './svg/ArrowHead.vue';

export default {
	props: [
		'pageTop'
	],

	components: {
		Logo,
		ArrowHead
	},

	computed: {
		links() { return this.$store.state.navData.links; },
		resourceTags() { return this.$store.state.resourceTags; }
	},

	methods: {
		handleClick() {
			this.mutualOpen = false;
			if (!this.$store.state.device.mobile) {
				this.$store.dispatch('toggleNav');
			}
		}
	},

	data() {
		return {
			mutualOpen: false
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../styl/_variables"

.main-nav
	pointer-events none

.nav-content
	height 100%
	left 0
	position fixed
	top 0
	width 100%
	z-index 10

	+below($laptop)
		pointer-events all
		-webkit-overflow-scrolling touch
		overflow-y scroll
		overflow-x hidden

.bg
	background $b
	abs()
	height $let * 3.5rem
	position fixed
	transition transform 300ms $easeOutQuint
	transition-property transform, height
	z-index 8

	&.v-enter,
	&.v-leave-to
		transform translate3d(0, -100%, 0)

	+below($laptop)
		height $let * 3rem

		&.nav-open
			height 100%
			pointer-events all

for i in 1..10
	li:nth-child({i})
		transition opacity 0.5s, transform 0.5s
		transition-delay 0.1s * i
		.v-enter &
			opacity 0
			transform translateY(1rem)

.links
	list-style none
	margin 0 auto
	max-width 1060px
	padding 0
	position relative
	width (300 / 375) * 100%

	+above($tablet)
		width (540 / 768) * 100%

	+above($notebook)
		height $let * 3.5rem
		width (780 / 1024) * 100%

	+above($laptop)
		display flex
		width (1060 / 1366) * 100%

		.home-link
			margin-right auto
			padding-left 0

		/deep/
			li:last-child
				padding-right 0

	+below($laptop)
		pad(4, 0)

	.router-link-exact-active, .drop-toggle .router-link-active
		&::before
			background $bluesat
			transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1)

		&::after
			transition-duration 0.6s
			width 100%

		&:hover
			&::before
				transition-duration 0.6s

			&::after
				background $w
				transition-duration 0.5s
				width 0

	/deep/
		li
			+above($laptop)
				pad(1, .5)
				margin auto 0

				&.dropdown
					padding 0

			+below($laptop)
				display block
				margin 0
				pad(.5, 0)

		a
			color $w
			display inline-block
			font-smoothing()
			pointer-events all
			vertical-align top

			&::before, &::after
				background $w

			&:hover
				&::after
					background none

			+below($laptop)
				font-family $cormorant
				fs(30)

.dropdown-container
	position relative

.drop-toggle
	+above($laptop)
		pad(1,0,1,.5)

	/deep/
		a, button
			display inline-block
			vertical-align middle

		button
			border 0
			margin 0
			padding 0
			pointer-events all
			pad(.5,.25)

	.arrow-head
		display block

		+above($laptop)
			width: 0.7em

.anchor-links
	+above($laptop)
		left $gut*-.5rem
		position absolute
		right $gut*-.5rem
		top 100%

	+below($tablet)
		fs(18)

	&.page-top
		top auto
		a
			background $b

	+below($laptop)
		fs(18)

	/deep/ a
		background-color $b
		display block
		max-height 6em
		margin-top 2px
		transition max-height 300ms $easeOutQuint

		&.page-top
			padding 0

		&:after, &::before
			content none

		&.v-enter, &.v-leave-to
			max-height 0em

		&.v-enter-active
			for i in 1..4
				&:nth-child({i})
					transition-delay 100ms * i

					.text
						transition-delay 100ms * (i + 1)

		+below($laptop)
			font-family $circular
			margin 0

	.text
		pad(.5, 0, .5, 1)
		fs(16)
		transition opacity 0.3s, transform 0.3s

		+above($laptop)
			line-height (15 / 13)
			pad(.5, .5)
			text-align center

	.v-enter, .v-leave-to
		.text
			opacity 0
			transform translate(0,-50%)

.home-link
	/deep/ a
		&::before, &::after
			content none

</style>
