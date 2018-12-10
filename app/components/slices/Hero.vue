<template>
	<div class="hero">

		<div class="bg"
			:style="{ backgroundImage: `url('${image[0].url}')` }"/>

		<div class="wrap">
			<div class="copy">
				<h2 v-if="heading"
					v-html="heading"/>
				<h3 v-if="subheading"
					v-html="subheading"/>
				<p v-if="copy"
					v-html="copy"/>
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

.copy
	bottom 0
	color $w
	left (100% / 8)
	width (300% / 8)
	position absolute

	h2
		color $w
		font-family $integral
		fs(62)
		line-height (51 / 62)

</style>