<template>
	<div class="main-nav">

		<transition appear>
			<div class="bg" v-if="$store.state.device.win.x < 1366 || !pageTop"
				:key="$route.fullPath"/>
		</transition>

		<nav>
			<ul :class="[ 'links', { 'bg-links' : !pageTop }]" v-if="$store.state.navData">

				<li v-if="$store.state.device.win.x > 1366">
					<router-link
						to="/"
						@click.native="handleClick()"
						class="home-link"
						title="Home">
						<logo class="light" :interactive="true"/>
					</router-link>
				</li>

				<li v-for="link in $store.state.navData.links"
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
			this.$store.dispatch('toggleNav');
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
	left 0
	position fixed
	top 0
	width 100%
	z-index 10

	+below($laptop)
		// height 85%
		// top 15%
		pad(3, 0)
		font-family $cormorant
		fs(30)
		-webkit-overflow-scrolling touch
		overflow-y scroll
		overflow-x hidden
		z-index 12

.bg
	background $b
	abs()
	transition transform 300ms $easeOutQuint

	&.v-enter,
	&.v-leave-to
		transform translate3d(0, -100%, 0)

	+below($laptop)
		display none

for i in 1..10
	li:nth-child({i})
		transition opacity 0.5s, transform 0.5s
		transition-delay 0.1s * i
		.v-enter &
			opacity 0
			transform translateY(1rem)

.links
	margin 0 auto
	list-style none
	padding 0
	position relative

	a.router-link-exact-active, .drop-toggle .router-link-active
		&:before
			width 100%
			left 0
			background $w
			transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1)

		&:after
			transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1)
			width 100%
			background $w

		&:hover
			&::before
				background $bluesat
				width 100%
				transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1)
				

			&::after
				background $w
				right 0
				transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1)
				width 0%

	margin 0 auto
	max-width 1060px
	width (300 / 375) * 100%

	+above($tablet)
		width (540 / 768) * 100%

	+above($notebook)
		width (780 / 1024) * 100%

	+above($laptop)
		display flex
		width (1060 / 1366) * 100%

	+above($laptop)
		width (780 / 1024) * 100%

	+above($laptop)
		width (1060 / 1366) * 100%

		/deep/
			li:first-child
				margin-right auto
				padding-left 0

			li:last-child
				padding-right 0

	/deep/
		li, a
			+below($mobile)
				pad(.5,0)

		li
			pad(1,.5)
			margin auto 0
			position relative

			+below($laptop)
				display block
				padding 4vh 0 0 0

			&.dropdown
				+above($laptop)
					pad(0,0)
					/deep/ a:after, a:before
						top 1.75em

		a
			color $w
			display inline-block
			font-smoothing()
			vertical-align top

			// +below($laptop)
			// 	fs(14)
			// 	mgn(0,0)

			+below($laptop)
				fs(30)

			&::before, &::after
				background $w

			&:hover
				&::after
					background none

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

			+above($laptop)
				pad(.5,.25)

	.arrow-head
		display block
		width: 0.7em

		+below($laptop)
			width 0.3em

.anchor-links
	font-family $circular

	+above($laptop)
		left $gut*-.5rem
		position absolute
		right $gut*-.5rem
		top 100%

	+below($laptop)
		padding-top 2vh

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
			// pad(0.8,0,0)
			margin 0

			// &:first-child
			// 	pad(1,0,0)
			// &:last-child
			// 	pad(0.8,0,1)

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
	&:before, &:after
		content none

</style>
