<template>
	<div :class="[ 'image-copy-feature', dir ]">
		<div class="wrap">

			<div class="copy">
				<div class="content">

					<h2 v-if="heading"
						v-html="heading"/>
					<h3 v-if="subheading"
						v-html="subheading"/>
					<p v-if="copy"
						v-html="copy"/>

					<core-button fill="#fff"
						label="Explore All Features"/>

				</div>
			</div>

			<div class="image">
				<img v-if="image"
					:src="image[0].url"/>
			</div>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {

	mixins: [ airprops ],

	computed: {
		dir() {
			return 'image-left';
		}
	}

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.image-copy-feature
	@extend .slice

+above($tablet)
	.wrap
		align-items center
		display flex

		.image-left &
			flex-direction row-reverse

	.image
		width (300% / 8)

	.copy
		background $red
		pad(2, 0)
		width (500% / 8)

	.content
		margin 0 (100% / 5)

		/deep/ p
			color $w
			font-family $akkurat-light
			fs(26)
			font-weight 300
			line-height (36 / 26)
			mgn(3, 0)

		.button
			margin-right 0
			width (200% / 3)

.image
	img
		width 100%


</style>
