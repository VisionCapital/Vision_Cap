<template>
	<div class="main-nav">

		<transition appear>
			<div class="bg" v-if="$store.state.device.win.x < 1024 || !pageTop"
				:key="$route.fullPath"/>
		</transition>

		<nav>
			<ul :class="[ 'links', { 'bg-links' : !pageTop }]" v-if="$store.state.navData">

				<li v-if="$store.state.device.win.x > 1024">
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

	+below($notebook)
		height 85%
		top 15%
		pad(0,1,2)
		font-family $cormorant
		fs(30)
		-webkit-overflow-scrolling touch
		overflow-y scroll
		overflow-x hidden
		z-index 12

	+below($tablet)
		padding-bottom 5vw

.bg
	background $b
	abs()
	transition transform 300ms $easeOutQuint

	&.v-enter,
	&.v-leave-to
		transform translate3d(0, -100%, 0)

	+below($notebook)
		display none

for i in 1..10
	li:nth-child({i})
		transition opacity 0.5s, transform 0.5s
		transition-delay 0.1s * i
		.v-enter &
			opacity 0
			transform translateY(1rem)

.links
	display flex
	margin 0 auto
	list-style none
	padding 0
	position relative
	justify-content center
	margin 0 12px

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



	+below($notebook)
		flex-direction column
		justify-content flex-start
		min-height 100%

	+above($notebook)
		text-align center
		margin 0 auto
		max-width 1060px
		width 80%

	/deep/
		a
			color white
			display inline-block
			font-smoothing()
			vertical-align top
			white-space nowrap

			+below($laptop)
				fs(10.5)
				mgn(0,0)
			+below($notebook)
				fs(30)

			&::before, &::after
				background $w

			&:hover
				&::after
					background none

		li
			max-width 280px
			pad(1,.5)
			margin auto 0
			position relative

			+below($notebook)
				padding 4vh 0 0 0

			&.dropdown
				+above($notebook)
					pad(0,0)
					/deep/ a:after, a:before
						top 1.75em


		li:first-child
			margin-right auto
			padding-left 0
		li, a

			+below($mobile)
				pad(.5,0)

.light
	max-width 300px


.dropdown-container
	position relative

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

	.arrow-head
		display block
		width: 1em

		+below($notebook)
			width 0.75em

.anchor-links
	font-family $circular

	+above($notebook)
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

	+below($notebook)
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

		+below($notebook)
			&:first-child
				pad(1,0,0)
			&:last-child
				pad(0.8,0,1)
			pad(0.8,0,0)
			margin 0

	.text
		// mgn(0,0.5)
		fs(14)
		pad(0,0.5)
		display inline-block
		transition opacity 0.3s, transform 0.3s

		+above($notebook)
			line-height (15 / 13)
			white-space normal

	.v-enter, .v-leave-to
		.text
			opacity 0
			transform translate(0,-50%)

.home-link
	&:before, &:after
		display none

</style>
