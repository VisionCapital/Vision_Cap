<template>
	<div class="main-nav">

		<transition>
			<div class="bg" v-if="$store.state.device.mobile || !pageTop"/>
		</transition>

		<nav>
			<ul class="links" v-if="$store.state.navData">

				<li v-if="$store.state.device.win.x > 1024">
					<router-link
						to="/"
						class="home-link"
						title="Home">
						<logo class="light" :interactive="true"/>
					</router-link>
				</li>

				<li v-for="link in $store.state.navData.links"
					:key="link.page_link.slug">
					<router-link :to="`/${link.page_link.slug}`"
						v-if="link.page_link.slug"
						:title="link.link_title[0].text"
						@click.native="$store.dispatch('toggleNav')"
						v-html="link.link_title[0].text"/>
				</li>

				<li class="resources">
					<div class="drop-toggle" @click="mutualOpen = !mutualOpen">
						<div v-html="'Resources'"></div>
						<arrow-head
							class="arrow-head"
							:pointDown="mutualOpen"
							color="#fff"
						/>
					</div>
					<div class="dropdown" v-if="mutualOpen">
						<router-link v-for="(tagID, name) in $store.state.resourceTags" 
							:to="`/resources#${tagID}`" 
							v-html="name" 
							:class="tagID"
							:key="tagID"/>
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
	+below($notebook) {
		height 100%
		pad(5,1)
		font-family $cormorant
		fs(30)
	}

.bg
	background black
	abs()
	transition opacity 0.5s, transform 0.5s
	&.v-enter,
	&.v-leave-to
		transform translateY(-100%)
		opacity 0

.links
	margin 0
	list-style none
	padding 0
	position relative
	display flex
	justify-content center
	+below($tablet)
		flex-direction column
	+above($notebook)
		text-align center

	/deep/
		a
			color white

		li
			max-width 280px
			mgn(1,.5)
			vertical-align middle
			+above($notebook)
				display inline-block
			&:nth-last-child(-n+3)
				order 7

.links /deep/ li.resources 
	order 6

.resources
	color $w
	.arrow-head 
		margin-left 1em

	.drop-toggle
		display flex;
		cursor pointer
.dropdown
	display flex
	flex-direction column
	text-align left
</style>
