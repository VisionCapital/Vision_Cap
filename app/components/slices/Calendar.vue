<template>
	<div class="calendar">
		<div class="wrap">
			<div class="dates">

				<h2 v-if="heading"
					v-html="heading"/>

				<div v-if="splitCopy"
					v-for="n in 6"
					:key="n"
					class="date">
					<h3 v-html="splitCopy[0]"/>
					<h4 v-html="splitCopy[1]"/>
					<h5 v-html="splitCopy[2]"/>
					<p v-html="splitCopy[3]"/>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],

	created() {
		if (this.copy) {
			this.splitCopy = this.copy.split(/\n/);
		}
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.calendar
	@extend .slice

.dates
	display flex
	flex-wrap wrap
	margin (100% / 8) (100% / 8) (100% / 8) (200% / 8)
	position relative

	/deep/
		h2
			bottom 100%
			position absolute
			right (6 / 5) * 100%
			transform rotateZ(-90deg)
			transform-origin right bottom

		h2, h3, h4, h5
			margin 0

.date
	padding-right 1em
	width (100% / 5)

	&:first-of-type
		width (200% / 5)

	/deep/
		h3
			color $blue
			font-family $cormorant-light
			fs(60)
			font-weight 300
			letter-spacing -(3 / 60) * 1em
			margin-left -0.1em

		h4
			fs(14)
			font-weight bold
			letter-spacing (0.1 / 14) * 1em
			line-height (18 / 14)

		h5
			fs(12)
			letter-spacing (0.33 / 12) * 1em
			line-height (18 / 12)

		p
			@extend .smol-copy

</style>