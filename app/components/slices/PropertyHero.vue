<template>
	<div class="hero">

		<div class="bg"
			:style="{ backgroundImage: `url('${image[0].url}')` }"/>

		<div class="wrap">

			<div class="copy">
				<h2 v-if="heading"
					v-html="heading"/>
			</div>

			<div class="info">
				<div class="card">
					<h3 v-html="splitCopy[0]"/>
					<h4 v-html="splitCopy[1]"/>
				</div>
				<div class="card">
					<h3 v-html="splitCopy[2]"/>
					<h4 v-html="splitCopy[3]"/>
				</div>
			</div>

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {

	mixins: [ airprops ],

	data() {
		return {
			splitCopy: null
		};
	},

	created() {
		if (this.copy) {
			this.splitCopy = this.copy.split(/\n/);
		}
	}

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.hero
	@extend $slice
	height 100%
	position relative

.bg
	background-repeat no-repeat
	background-position center
	background-size cover
	abs()

.wrap
	height 100%
	position relative

.copy
	bottom 0
	color $w
	left (100% / 8)
	width (300% / 8)
	position absolute

	/deep/ h2
		color $w
		fs(62)
		letter-spacing (0.3 / 62) * 1em
		line-height (51 / 62)
		mgn(.5, 0)
		word-spacing 10em

.info
	background $blue
	bottom 0
	color $w
	display flex
	right 0
	width (400% / 8)
	position absolute

.card
	pad(1,0)
	width 25%

	/deep/
		h3, h4
			fs(12)
			line-height (20 / 12)
			margin 0
			text-align center

		h3
			font-weight bold
			letter-spacing (0.4 / 12) * 1em
			text-transform uppercase

</style>