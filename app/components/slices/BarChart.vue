<template>
	<div class="bar-chart">

		<div class="wrap">

			<div class="title-card">
				<div class="bg"/>
				<h2 v-if="heading"
					v-html="heading"/>
				<h2 v-html="data.html('vision_opp_pdf_title')"/>
				<a :href="data.fields.pdf_link_name" target="_blank" v-html="data.html('pdf_link_name')"/>
			</div>

			<div class="title-copy" v-if="data.fields.bar_chart_title"
				v-html="data.html('bar_chart_title')"/>

			<div class="title-copy" v-else-if="subheading">
				<h3 v-html="subheading"/>
			</div>

			<div class="chart">

				<div class="bars">
					<div class="bar" v-for="(bar, idx) in indices" :key="idx">
						{{ bar.returns + '%' }}
						{{ bar.name }}
					</div>
				</div>

				<div class="cagr">
					<div class="bar" v-for="(bar, idx) in indices" :key="idx">
						{{ bar.cagr + '%' }}
					</div>
				</div>

			</div>

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {

	mixins: [ airprops ],

	computed: {
		indices() {
			let indices = this.data.items.map((x) => {
				return {
					name: this.data.textField(x.index_title),
					returns: this.data.textField(x.total_returns),
					cagr: this.data.textField(x.cagr)
				};
			});

			return indices;
		}
	}

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
	padding-bottom 3rem

	/deep/ h3
		fs(mp(2))
		mgn(1,auto)
		font-family $cormorant-medium
		text-align center

.title-card
	align-self flex-start
	color $w
	order 2
	position relative
	pad(.5,2,2,0)
	+below($tablet)
		pad(.5,1,2,0)


	a:before, a:after
		background none

	/deep/
		h2, a
			color $w
			position relative

		h2
			fs(mp(2))
			letter-spacing -(0.32 / 32) * 1em
			font-family $cormorant-medium

		a
			display inline-block

	+above($tablet)
		width (200% / 9)

	.bg
		background url('../../images/strip-bg.jpg')
		background-repeat no-repeat
		background-size cover
		display inline-block
		height 100%
		width auto
		bottom 0
		left -($gut * 2em)
		right 0
		top 0
		position absolute
		+below($tablet)
			left -15vw
			right auto
			width 100vw

.chart
	order 3
	+below($tablet)
		pad(2,1,0)

	+above($tablet)
		width (700% / 9)

</style>
