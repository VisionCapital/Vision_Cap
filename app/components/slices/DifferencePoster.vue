<template>
	<div class="difference-poster">

		<div class="bg"
			:style="{ backgroundImage: `url('${image[0].url}')` }"/>

		<div class="content">

			<div class="knockout">
				<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1440" viewBox="0 0 1440 1440">
					<path fill="#fff" d="M412.7 206.5L201 863a19.8 19.8 0 0 1-37.5 0L79 601.5l-79-243V0h1440v1440H0v-206.5h462.9l364.3-1027z"/>
				</svg>
			</div>

			<div class="wrap">
				<div class="copy">
					<h2 v-if="heading"
						v-html="heading"/>
					<h3 v-if="subheading"
						v-html="subheading"/>
					<p v-if="copy"
						v-html="copy"/>

					<core-button type="link"
						route="/about/"
						label="Explore The Envoy Difference"/>
				</div>
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

.difference-poster
	@extend .slice
	background none
	height 100%

.bg
	background-repeat no-repeat
	background-position center
	background-size cover
	abs()
	position fixed
	z-index -1

.content
	height 100%
	overflow hidden
	position relative

.knockout
	abs()
	/deep/ svg
		fill $w
		left 0
		position relative
		margin-top -50%
		top 50%
		width 100%

.wrap
	align-items center
	display flex
	min-height 100%
	position relative

.copy
	margin-left (300% / 8)
	pad(3, 0)
	width (500% / 8)

	/deep/
		h2
			font-family $integral
			fs(78)
			letter-spacing (0.3 / 78) * 1em
			line-height (74 / 78)

		h3
			@extend .heading
			fs(46)
			line-height (56 / 46)
			letter-spacing -(0.7 / 46) * 1em
			max-width (432 / 46) * 1em
			mgn(3, 0)

	.button, /deep/ h3
		margin-left (200% / 5)

	.button
		width (200% / 5)

</style>