<template>
	<div class="bar-chart">

		<div class="wrap">

			<div class="title-card">
				<div class="bg"/>
				<h2 v-if="heading"
					v-html="heading"/>
				<a href="#">View PDF</a>
			</div>

			<div class="title-copy">
				<h3 v-if="subheading"
					v-html="subheading"/>
			</div>

			<div class="chart">
				<img :src="image[0].url"/>
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

.bar-chart
	@extend .slice
	pad(2,0)

.wrap
	display flex
	flex-wrap wrap

.title-copy
	order 1
	width 100%
	+below($tablet)
		pad(0,1)

	/deep/ h3
		fs(mp(2))
		mgn(1,auto)
		text-align center

.title-card
	align-self flex-start
	color $w
	order 2
	position relative
	pad(.5,1,2,0)
	+below($tablet)
		pad(.5,1,2,1)

	/deep/
		h2, a
			color $w
			position relative

		h2
			fs(mp(2))
			letter-spacing -(0.32 / 32) * 1em

		a
			display inline-block

	+above($tablet)
		width (200% / 9)

	.bg
		background $blue
		bottom 0
		left -($gut * 2em)
		right 0
		top 0
		position absolute

.chart
	order 3
	+below($tablet)
		pad(2,1,0)

	+above($tablet)
		width (700% / 9)

</style>
