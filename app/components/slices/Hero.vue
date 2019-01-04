<template>
	<div class="hero">

		<div class="bg" v-if="image"
			:style="{ backgroundImage: `url('${image[0].url}')` }"/>

		<div class="wrap">
			<div class="copy">
				<h1 v-if="heading"
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
	pad(4,0)
	position relative
		
	.wrap
		color $w
		position relative

		/deep/ h1
			color $w
			line-height 1em
			padding-bottom 0.3em
	
			+below($tablet)
				padding-bottom 1em
				fs (60)
				line-height (73/60)
		/deep/ p
			+below($tablet)
				fs(12)
				line-height (24/12)
.bg
	background-repeat no-repeat
	background-size cover
	height 100%
	left 0
	position absolute
	top 0
	width 100%

</style>