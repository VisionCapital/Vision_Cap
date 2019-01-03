<template>
	<div class="map">
		<div class="wrap">

			<div class="annotations">

				<div class="copy">
					<h2 v-if="heading"
						v-html="heading"/>
					<p v-if="subheading"
						v-html="subheading"/>
				</div>

				<div class="cta">
					<core-button label="View Larger Map"/>
				</div>

			</div>

			<div class="map-frame">
				<div class="map-ratio">
					<!-- <img v-if="copy"
						:src="copy"/> -->
						<iframe :src="copy"></iframe>
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

	.wrap
		margin-left 5%
		max-width none
		width 95%

.map-frame
	width 70%


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

.wrap
	display flex
	justify-content space-between


.annotations
	margin-right 40px
	display flex
	flex-direction column
	justify-content center


	/deep/ h2,
	/deep/ h3

	+above($tablet)
		// display flex

		.copy
			// width (400%/ 6)

		.cta
			pad(1,0)
			width (200%/ 6)

			.button
				width 100%

</style>