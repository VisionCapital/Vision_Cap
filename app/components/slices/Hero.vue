<template>
	<div class="hero">

		<div class="bg"/>

		<!-- <div class="bg canvas">
			<hero-background/>
		</div> -->

		<div class="wrap">
			<div class="copy">

				<div class="hero-image" v-if="data.fields.hero_image.url">
					<img
						:src="data.image('hero_image')"/>
				</div>

				<h1 v-if="heading"
					v-html="heading"/>
				<h1 v-else-if="data.fields.hero_title.length"
					v-html="data.text('hero_title')"/>

				<h3 v-if="subheading"
					v-html="subheading"/>

				<p v-if="copy"
					v-html="copy"/>

				<div v-if="data.fields.hero_copy.length"
					v-html="data.html('hero_copy')"/>

			</div>
		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

import HeroBackground from '../HeroBackground.vue';

export default {
	components: {
		HeroBackground
	},
	mixins: [ airprops ]

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.hero-image
	// padding-left 15%
	// padding-right 15%
	// padding-top 5rem
	// align-content center

	pad(2,0,1)

	+above($tablet)
		pad(0,5,1,5)

		/deep/ img
			pad(1,0,0,0)
			// max-width 920px
			mgn(0,auto)

.hero
	@extend .slice
	pad(2,0,1)
	position relative

	+above($notebook)
		pad(4,0,2)

	.wrap
		color $w
		position relative

		/deep/ h1
			color $w
			// line-height 1
			fs(82)
			// padding-bottom 0.3em

			+below($tablet)
				// padding-bottom 1em
				fs(60)
				line-height (73/60)

		/deep/ p
			fs(16)
			+below($tablet)
				fs(12)
				line-height (24/12)

.bg
	background url('../../images/strip-bg.jpg')
	background-repeat no-repeat
	background-size cover
	height 100%
	left 0
	position absolute
	top 0
	width 100%

</style>