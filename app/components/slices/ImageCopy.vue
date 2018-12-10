<template>
	<div :class="[ 'image-copy', dir ]">
		<div class="wrap">

			<div class="copy">
				<div class="content">
					<h2 v-if="heading"
						v-html="heading"/>
					<h3 v-if="subheading"
						v-html="subheading"/>
					<p v-if="copy"
						v-html="copy"/>
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

.image-copy
	@extend .slice

+above($tablet)
	.wrap
		align-items center
		display flex

		.image-left &
			flex-direction row-reverse

	.image, .copy
		width 50%

	.content
		margin-left 25%

		/deep/ h2
			@extend .heading
			width 75%

		/deep/ p
			@extend .smol-copy
			width 66%

.image
	img
		width 100%


</style>
