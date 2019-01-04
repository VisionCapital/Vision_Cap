<template>
	<div class="hero">

		<div class="bg"/>

		<div class="wrap">
			<div class="copy">

				<img v-if="data.fields.hero_image.url"
					:src="data.image('hero_image')"/>

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
	@extend .slice
	pad(5,0)
	position relative

	.wrap
		color $w
		position relative

		/deep/ h1
			color $w
			line-height 1em

			+below($tablet)
				fs(mp(4))
.bg
	background url('../../images/strip-bg.jpg')
	background-repeat no-repeat
	background-size cover
	height 100%
	left 0
	position absolute
	top 0
	width 100%

</style>