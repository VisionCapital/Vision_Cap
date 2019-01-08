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

				<div class="cta" v-if="$store.state.device.win.x > 1024"><!-- if it's desktop-->
				<h4 v-html="data.text('map_title')"/>
				<p v-html="data.text('map_location')"/>
					<a :href="data.fields.map_link.url" target="_blank">
						<div v-html="data.text('map_link_title')"/>
						</a>
					<!-- <core-button label="View Larger Map"/> -->
				</div>

				<div class="cta-mobile" v-if="$store.state.device.win.x < 1024"><!-- if it's mobile-->
				<h4 v-html="data.text('map_title')"/>
				<p v-html="data.text('map_location')"/>
					<!-- <core-button label="View Larger Map"/> -->
				</div>

			</div>

			<div class="map-frame">
				<div class="map-ratio">
					<div v-html="data.text('map_embed_code')"/>
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

	width auto
	display flex
	background-color $lightgrey
	margin 0 0 0 auto

p
	max-width 80%
h4
	color $blue

.map-frame
	width 100%
.map-ratio
	overflow hidden
	padding-bottom 50%
	position relative
	width 100%
	+below($notebook)
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
	+below($notebook)
		flex-direction column

.annotations
	display flex
	width auto
	flex-direction column
	justify-content center
	+above($notebook)//laptop
		margin-left 11%
	+above($laptop)//laptop-large
		margin-left 13%
	+above($laptop-large)//desktop
		margin-left 17%
	+above($desktop)//ultra
		margin-left 22.5%
	+below($notebook)
		text-align center
	/deep/ h2,
	/deep/ h3
		+below($notebook)
			fs(30)
			padding 0 5%

	+above($tablet)
		text-align left


		.cta
			pad(1,0)
			//width (200%/ 6)


			.button
				width 100%

	+above($mobile)

		.cta-mobile
			text-align center
			display inline-block

	
</style>