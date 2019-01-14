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
	+below($notebook) 
		height 100%
		pad(5,1)
		font-family $cormorant
		fs(30)
		-webkit-overflow-scrolling touch
		overflow-x hidden
		overflow-y scroll
	+below($tablet)
		padding-top 20vw
		padding-bottom 20vw
.bg
	background black
	abs()
	transition opacity 0.5s, transform 0.5s
	&.v-enter,
	&.v-leave-to
		transform translateY(-100%)
		opacity 0

	+below($notebook)
		position fixed

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
		min-height 100vh
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
				pad(.4,0)
			+below($mobile)
				pad(.5,0)

.links /deep/ li.resources
	order 6

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
		+below($tablet)
			padding-left 1em

.router-link-exact-active 
	border-bottom: 3px solid white;

.bg-links
	
	a
		&:before, &:after
			content: ''
			position: absolute;
			height 3px

		&:before
			content: ''
			background: $w;
			left 0
			top 100%
			width: 0%
			left: -2px;

		&:after
			background: $w;
			right: 2px;
			right 0
			top 100%
			width: 0%
			transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1);

		&:hover
			color: $w;
			transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1);

			&:before
				width: 100%;
				transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1);

			&:after
				width: 100%;
				transition: 0s;
				background: transparent;


</style>
