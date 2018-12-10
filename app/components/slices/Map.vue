<template>
	<div class="map">
		<div class="wrap">

			<div class="map-frame">
				<div class="map-ratio">
					<img v-if="image"
						:src="image[0].url"/>
				</div>
			</div>

			<div class="annotations">

				<div class="copy">
					<h2 v-if="heading"
						v-html="heading"/>
					<h3 v-if="subheading"
						v-html="subheading"/>
					<p v-if="copy"
						v-html="copy"/>
				</div>

				<div class="cta">
					<core-button label="View The Map"/>
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

.map
	@extend .slice

.map-frame
	margin (100% / 8) (100% / 8) 0
	width (600% / 8)

.map-ratio
	overflow hidden
	padding-bottom 50%
	position relative
	width 100%

	/deep/ iframe,
	/deep/ img
		left 0
		position absolute
		top 0
		width 100%

	/deep/ iframe
		height 100%

.annotations
	margin 0 (100% / 8) 0
	width (600% / 8)

	/deep/ h2,
	/deep/ h3
		fs(30)

	+above($tablet)
		display flex

		.copy
			width (400%/ 6)

		.cta
			pad(1,0)
			width (200%/ 6)

			.button
				width 100%

</style>