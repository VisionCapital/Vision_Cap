<template>
	<div class="main-nav">

		<transition>
			<div class="bg" v-if="$store.state.device.win.x <= 1024 || !pageTop"/>
		</transition>

		<nav>
			<ul :class="[ 'links', { 'bg-links' : true }]" v-if="$store.state.navData">
					<!--	<div v-if="!pageTop"/>
					<a :style="{'background-color': red }"></a>
				<div/> -->
				<li v-if="$store.state.device.win.x > 1024">
					<router-link
						to="/"
						@click.native="handleClick()"
						class="home-link"
						title="Home">
						<logo class="light" :interactive="interactive"/>
					</router-link>
				</li>

				<li v-for="link in $store.state.navData.links"
					:key="link.page_link.slug">
					<router-link :to="`/${link.page_link.slug}`"
						v-if="link.page_link.slug"
						:title="link.link_title[0].text"
						@click.native="handleClick()"
						v-html="link.link_title[0].text"/>
				</li>

				<li class="resources">
					<div class="drop-toggle">
						<router-link to="/resources"
							@click.native="handleClick()"
							v-html="'Resources'"/>
						<arrow-head @click.native="mutualOpen = !mutualOpen"
							class="arrow-head"
							:pointDown="mutualOpen"
							color="#fff"
						/>
					</div>
					<div class="dropdown" v-if="mutualOpen" :class="{'page-top': !pageTop}">
						<router-link v-for="(tagID, name) in $store.state.resourceTags"
							:to="`/resources#${tagID}`"
							v-html="name"
							:key="tagID"
							@click.native="handleClick()"/>
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
@import "../styl/_global"

.main-nav
	left 0
	position fixed
	top 0
	width 100%
	z-index 10
	transition all 2s
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
	transition opacity 0.5s, transform 0.5s
	&.v-enter,
	&.v-leave-to
		transform translateY(-100%)
		opacity 0

	+below($notebook)
		display none

for i in 1..10
	li:nth-child({i})
		order i
		transition opacity 0.5s, transform 0.5s
		transition-delay 0.1s * i
		.v-enter &
			opacity 0
			transform translateY(1rem)

for i in 6..10
	li:nth-child({i})		
		transition-delay 0.1s * i + 0.1s

.links
	margin 0 auto
	list-style none
	padding 0
	position relative
	display flex
	justify-content center
	max-width 1060px
	width 80%

	+below($notebook)
		flex-direction column
		justify-content flex-start
		min-height 100%
	+above($notebook)
		text-align center


	/deep/
		a
			color white
		li
			max-width 280px
			pad(1,.5)
			margin 0
			&:first-child
				margin-right auto
				padding-left 0
			&:nth-last-child(-n+3)
				order 7
		li, a
			// vertical-align middle
			// +above($notebook)
			// 	display inline-block
			+below($notebook)
				padding 2vh 0
			+below($mobile)
				pad(.5,0)


.links /deep/ li.resources
	order 6
	transition-delay 0.6s

.resources
	color $w
	position relative
	.arrow-head
		margin-left 1em
		+below($tablet)
			width 0.75em

	.drop-toggle
		display flex;
		cursor pointer
.dropdown
	font-family $circular
	display flex
	flex-direction column
	+above($tablet)
		position absolute
		left 50%
		transform translateX(-50%);
		width 100%
	&.page-top
		top 100%
		a
			background $b

	+below($tablet)
		fs(18)
	a
		background-color black
		pad(0.5,0.5)
		margin-top 2px
		&.page-top
			padding 0
		&:hover::after, &:hover::before
			display none
		+below($notebook)
			padding 2vh 0
			padding-left 1em


.bg-links
	a:before, a:after
		background-color $w

.router-link-exact-active
	&:after	
		width 100%
	



</style>
