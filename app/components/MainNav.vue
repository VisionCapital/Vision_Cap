<template>
	<div class="main-nav">

		<transition>
			<div class="bg" v-if="$store.state.device.win.x < 1024 || !pageTop"/>
		</transition>

		<nav>
			<ul :class="[ 'links', { 'bg-links' : !pageTop }]" v-if="$store.state.navData">

				<li v-if="$store.state.device.win.x > 1024">
					<router-link
						to="/"
						@click.native="handleClick()"
						class="home-link"
						title="Home">
						<logo class="light" :interactive="interactive"/>
					</router-link>
				</li>

				<li :class="link.link_type" v-for="link in $store.state.navData.links"
					:key="link.page_link.slug">

					<router-link :to="`/${link.page_link.slug}`"
						v-if="link.page_link.slug && link.link_type === 'normal'"
						:title="link.link_title[0].text"
						@click.native="handleClick()"
						v-html="link.link_title[0].text"/>

					<div class="dropdown-container" v-if="link.page_link.slug && link.link_type === 'dropdown'">
						<div class="drop-toggle">
							<router-link :to="`/${link.page_link.slug}`"
								@click.native="handleClick()"
								v-html="link.link_title[0].text"/>
							<arrow-head @click.native="mutualOpen = !mutualOpen"
								class="arrow-head"
								:pointDown="!mutualOpen"
								color="#fff"
							/>
						</div>

						<div class="anchor-links" :class="{'page-top': !pageTop}">
							<transition v-for="(tag, idx) in $store.state.resourceTags" :key="idx" appear>
								<router-link
									v-if="mutualOpen"
									:to="`/${link.page_link.slug}#${tag.slug}`"
									:style="{'transition-delay': `${(idx) * 0.4}s`}"
									@click.native="handleClick()"
								>
									<div class="text"
										:style="{'transition-delay': `${idx * 0.4 + 0.3}s`}"
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

	computed: {
		interactive() {
			return true; // /Chrome/.test(navigator.userAgent);
		}
	},
	methods: {
		// linkDelay(idx) {
		// 	if (this.mutualOpen) {
		// 		return `${idx * 0.4}s`;
		// 	}
		// 	return `${(this.$store.state.resourceTags.length - idx) * 0.5}s`;
		// },
		handleClick() {
			this.mutualOpen = false;
			this.$store.dispatch('toggleNav');
		}
	},
	components: {
		Logo,
		ArrowHead
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
// @import "../styl/_global"

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
		overflow-x hidden
		overflow-y scroll
		z-index 12
	+below($tablet)
		padding-bottom 5vw

.bg
	background black
	abs()
	transition opacity 0.2s, transform 0.2s
	&.v-enter,
	&.v-leave-to
		transform translateY(-100%)
		opacity 0

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
	+below($notebook)
		flex-direction column
		justify-content flex-start
		min-height 100%
		
		// margin-left: 4rem;

	+above($notebook)
		text-align center
		margin 0 auto
		max-width 1060px
		width 80%


	/deep/
		a
			color white
			white-space nowrap
			fs(14)

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

		li //underline link resources
			max-width 280px
			pad(1,.5)
			display flex
			margin auto 0
			&.dropdown
				/deep/ a:after, a:before
					top 4.5rem
				+above($notebook)
					pad(0,0)
					/deep/ a:after, a:before
						top 22px


		li:first-child
			margin-right auto
			padding-left 0
		li, a
			+below($notebook)
				padding 4vh 0 0 0
			+below($mobile)
				pad(.5,0)

.light
	max-width 300px

.dropdown-container
	color $w
	position relative
	height 100%

	svg
		width: 1em;

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

.anchor-links
	font-family $circular
	display flex
	flex-direction column
	+below($notebook)
		font-family $cormorant
	+above($notebook)
		position absolute
		left 50%
		transform translateX(-50%);
		width 100%
		top 100%

	+below($tablet)
		fs(18)

	&.page-top
		top auto
		a
			background $b

	+below($notebook)
		fs(18)
	a
		max-height 8rem
		transition max-height 0.5s
		background-color none
		margin-top 2px
		// &:first-child
		// 	padding 2vh 0
		&.page-top
			padding 0
		&:after, &::before
			display none
			width 0
		&.v-enter, &.v-leave-to
			max-height 0vh
		+below($notebook)
			// &:first-child
			// 	padding 3vh 0
			// margin-left 1em
			pad(1,0,0)
			margin 0

	.text
		// mgn(0,0.5)
		pad(0.5,0.5)
		display inline-block
		transition opacity 0.3s, transform 0.3s
		+above($notebook)
			white-space: normal;
			line-height 1.5

	.v-enter, .v-leave-to
		.text
			opacity 0
			transform translate(0,-50%)

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
