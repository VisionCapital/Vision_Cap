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

				<div class="cta" v-if="!$store.state.device.mobile">
					<a href="https://www.google.com/maps?ll=43.647978,-79.384653&z=15&t=m&hl=en-US&gl=CA&mapclient=embed&cid=3974017344680135893" 
					v-html="'View Larger Map'"
					target="blank"></a>
					<!-- <core-button label="View Larger Map"/> -->
				</div>

			</div>

			<div class="map-frame">
				<div class="map-ratio">
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


.wrap
	width 95%
	margin 0 0 0 auto
	// compensating for extend .slice  on all the wraps
	+above(1060px * 1.1)
		width calc(100vw - (50vw - 1060px / 2))
	+below($tablet)
		width 100%


.map-frame
	width (600% / 9)
	width 100%
.map-ratio
	overflow hidden
	padding-bottom 50%
	position relative
	width 100%
	+below($tablet)
		padding-bottom 75%

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
	+below($tablet)
		flex-direction column

.annotations
	display flex
	flex-direction column
	justify-content center
	+below($tablet)
		text-align center
	/deep/ h2,
	/deep/ h3
		+below($tablet)
			fs(30)
			padding 0 5%

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