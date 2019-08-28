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

						<!-- <router-link v-if="link.link_type === 'normal'"
							:to="`/${link.page_link.slug}`"
							:title="link.link_title[0].text"
							v-html="link.link_title[0].text"/> -->
						<a v-if="link.link_type === 'normal'"
							:href="`https://visioncap.ca/${link.page_link.slug}`"
							:title="link.link_title[0].text"
							v-html="link.link_title[0].text"/>

						<div class="drop-toggle" v-if="link.link_type === 'dropdown'">

							<!-- <router-link :to="`/${link.page_link.uid}`"
								v-html="link.link_title[0].text"/> -->
							<a :href="`https://visioncap.ca/${link.page_link.uid}`"
								v-html="link.link_title[0].text"/>

							<button v-if="$store.state.device.win.x > 1366"
								@click.prevent="mutualOpen = !mutualOpen">
								<arrow-head
									class="arrow-head"
									:pointDown="mutualOpen"
									color="#fff"/>
							</button>

						</div>

						<div class="anchor-links" v-if="mutualOpen && link.link_type === 'dropdown' && $store.state.device.win.x > 1366">
							<transition v-for="(tag, idx) in $store.state.resourceTags" :key="idx" appear>
								<!-- <router-link :to="`/${link.page_link.uid}/${tag.slug}`"
									class="text-box"
									:key="idx">
									<div class="text" v-html="tag.title"/>
								</router-link> -->
								<a :href="`https://visioncap.ca/${link.page_link.uid}/${tag.slug}`"
									class="text-box"
									:key="idx">
									<div class="text" v-html="tag.title"/>
								</a>
							</transition>
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
		return {
			mutualOpen: false
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.footer
	position relative
	z-index 2

.home-link
	display inline-block
	margin 0 auto


.linkwrap
	vertical-align top
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
	color $w
	display flex
	list-style none
	margin 0 auto
	pad(1, 1)
	position relative
	width 100%
	max-width 1060px
	+above($mobile)
		justify-content center
		text-align center
		pad(1,0)
		max-width 376px

	+above($notebook)
		padding 0
		justify-content space-between
		max-width 1060px
		width 80%

	+below($laptop)
		flex-wrap wrap

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
				z-index 100
				transition-duration 0.5s
				width 0



	/deep/
		a
			&::before, &::after
				background $w
				content ''
				height 2px
				position absolute
				top 100%
				width 0%

			&::before
				left 0

			&::after
				right 0
				transition width 0.8s cubic-bezier(0.25,0.1,0.25,1)

			&:hover
				&::before
					transition width 0.5s cubic-bezier(0.25,0.1,0.25,1)
					width 100%

				&::after
					background 0
					transition 0s
					width 100%

			&.active
				&::before
					background $w
					transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1)

				&::after
					background $w
					transition-duration 0.6s
					width 100%

				&:hover
					&::before
						transition-duration 0.6s

					&::after
						background $w
						transition-duration 0.5s
						width 0

			color $w
			display inline-block
			font-smoothing()
			vertical-align top

			&:hover
				&::after
					background none
			+below($mobile)
				fs(12)

			.router-link-exact-active, .router-link-active
				/deep/ a
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
							z-index 100
							transition-duration 0.5s
							width 0
		li
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

			+above($laptop)
				&:last-child
					padding-right 0

			+below($mobile)
				pad(.25,1)
				width 50%

	.dropdown
		+above($laptop)
			padding 0

	.logo
		/deep/ a
			&::before, &::after
				background none

		+above($laptop)
			margin-right auto
			padding-left 0

		+below($laptop)
			pad(1,1)
			max-width 100%
			text-align center
			width 100%

	.arrow-head
		display block
		height (11 / 5)  * 0.7em
		width 0.7em

.drop-toggle
	+above($laptop)
		display flex
		pad(1,0,1,.5)
	/deep/
		a, button
			display inline-block
			vertical-align top

		button
			border 0
			margin 0
			padding 0

			+above($laptop)
				margin auto
				pad(0,.25)

.anchor-links
	bottom 100%
	left $gut*-2.15rem
	position absolute
	right $gut*-2.15rem

	.text-box
		margin auto
		background $blue
		max-height 6em
		pad(.5,.5)
		opacity 1
		transition all 300ms $easeOutQuint
		width: 100%;
		margin-bottom: 2px;

		&:before, &:after
			content none
		&.v-enter
			max-height 0em
			opacity 0

		&.v-enter-active
			for i in 1..4
				&:nth-child({5 - i})
					transition-delay 100ms * i

					.text
						transition-delay 100ms * (i + 1)

		.text
			position relative
			display inline-block
			&::before, &::after
				background $w
				content ''
				height 2px
				top 100%
				position absolute
				width 0%

			&::before
				left 0

			&::after
				right 0
				transition width 0.8s cubic-bezier(0.25,0.1,0.25,1)

			&:hover
				&::before
					transition width 0.5s cubic-bezier(0.25,0.1,0.25,1)
					width 100%

				&::after
					background 0
					transition 0s
					width 100%

			&.active
				&::before
					background $bluesat
					transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1)

				&::after
					background $b
					transition-duration 0.6s
					width 100%

				&:hover
					&::before
						transition-duration 0.6s

					&::after
						background $b
						transition-duration 0.5s
						width 0
	.router-link-exact-active, .router-link-active
		.text
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
					z-index 100
					transition-duration 0.5s
					width 0

	/deep/ a
		background $blue
		display block
		margin-bottom 2px
		pad(0.5,0.5)


a.router-link-exact-active, .drop-toggle .router-link-active
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
			z-index 100
			transition-duration 0.5s
			width 0



</style>
