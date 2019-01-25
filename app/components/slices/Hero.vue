<template>
	<div class="hero">

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

export default {

	mixins: [ airprops ]

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.hero
	background none
	@extend $slice
	pad(2,0,1)
	position relative

	+above($notebook)
		pad(4,0,2)

	.wrap
		color $w
		position relative

		/deep/
			h1
				color $w
				// fs(82)
				mgn(1,0,2)

				+below($tablet)
					fs(60)
					line-height (73/60)

			p
				fs(16)
				font-smoothing()

				+below($tablet)
					fs(12)
					line-height (24/12)

.hero-image
	pad(2,0,1)

	+above($tablet)
		pad(0,5,1,5)

		/deep/ img
			pad(1,0,0,0)
			mgn(0,auto)

</style>