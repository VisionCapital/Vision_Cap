<template>
	<div class="hero">

		<div class="bg"
			:style="{ backgroundImage: `url('${image[0].url}')` }"/>

		<div class="wrap">

			<div class="banner">
				<h1 v-if="heading"
					v-html="heading"/>
			</div>

			<div class="copy">
				<h3 v-if="subheading"
					v-html="subheading"/>
				<p v-if="copy"
					v-html="copy"/>

				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="61" viewBox="0 0 20 61">
					<g fill="none" fill-rule="evenodd">
						<g stroke="#FFF" stroke-width="2">
							<path d="M10 58.56V.25"/>
							<path stroke-linecap="round" d="M1.12 49.93l8.79 9.05 8.82-9.09"/>
						</g>
					</g>
				</svg>
			</div>

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ]
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.hero
	@extend .slice
	height 100%
	position relative

.bg
	background-repeat no-repeat
	background-position center
	background-size cover
	abs()

.wrap
	height 100%
	position relative

.banner
	bottom 50%
	color $w
	left (100% / 8)
	position absolute
	width (600% / 8)

	/deep/ h1
		color $w
		fs(120)
		letter-spacing (0.69 / 120) * 1em
		line-height (100 / 120)
		margin-left -.03em

.copy
	background $red
	bottom -($let) * 3em
	color $w
	left (100% / 8)
	pad(1, 2, 4)
	position absolute
	width (300% / 8)

	/deep/ h3
		color $w
		font-family $cormorant-light

</style>