<template>
	<div class="bar-chart">

		<div class="wrap">

			<div class="title-card">
				<div class="bg"/>
				<h2 v-if="heading"
					v-html="heading"/>
				<h2 v-html="data.html('vision_opp_pdf_title')"/>
				<a :href="data.fields.pdf_upload.url" target="_blank" v-html="data.html('pdf_link_name')"/>
			</div>

			<div class="title-copy" v-if="data.fields.bar_chart_title"
				v-html="data.html('bar_chart_title')"/>

			<div class="title-copy" v-else-if="subheading">
				<h3 v-html="subheading"/>
			</div>

			<div class="chart">

				<div class="bars">

					<div class="y">
						<div v-for="step in steps" :key="step"
							:style="{ height: 1 / steps * 100 + '%' }"
							class="step">
							<div class="label">
								{{ max - (step - 1) * 25 + '%' }}
							</div>
						</div>
						<div class="step">
							<div class="label">
								0%
							</div>
						</div>
					</div>

					<div class="index" v-for="(bar, idx) in indices" :key="idx"
						:style="{
								left: idx / indices.length * 100 + '%',
								width: 1 / indices.length * 100 + '%'
						}">

						<div class="bar-slot">
							<div class="bar" :style="{
								background: bar.name.includes('Vision') ? '#00227d' : '#cecece',
								height: bar.returns / max * 100 + '%'
							}">
								<div class="bar-label">
									{{ bar.returns + '%' }}
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="labels">

					<div class="title" v-for="(bar, idx) in indices" :key="idx"
						:style="{ width: 1 / indices.length * 100 + '%' }">
						{{ `${bar.name} (${idx + 1})` }}
					</div>
					<!-- <div class="index" v-for="(bar, idx) in indices" :key="idx">
						{{ bar.cagr + '%' }}
					</div> -->
				</div>

				<div class="cagr">
					<div class="index" v-for="(bar, idx) in indices" :key="idx"
						:style="{
							opacity: bar.name.includes('Vision') ? '1' : '0.34',
							width: 1 / indices.length * 100 + '%'
						}">
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
		},

		max() {
			return 25 * Math.ceil(this.indices[this.indices.length - 1].returns / 25);
		},

		steps() {
			return this.max / 25;
		}
	}

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"
@import "../../styl/_global"

.bar-chart
	@extend .slice
	pad(2,0)
	transition all 3s
	+below($tablet)
		&:nth-child(even)
			background $lightgrey
.wrap
	display flex

	+above($tablet)
		flex-wrap wrap

	+below($tablet)
		flex-direction column

.title-copy
	order 1
	width 100%
	// padding-bottom 3rem

	+above($tablet)
		padding-bottom 3rem
	.v-enter &
		/deep/ h3
			opacity 0
			line-height 1.5
			transform translateY(30%)

	/deep/ h3
		transition line-height 0.5s, opacity 0.5s, transform 0.5s
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

	// +below($tablet)
	// 	width 100%

	a:before, a:after
		background none

	
	.v-enter & 
		/deep/ h2, /deep/ a
			transform translateY(10%)
			opacity 0

	/deep/
		h2, a
			color $w
			position relative

		h2
			transition opacity 0.5s, transform 0.5s
			fs(mp(2))
			letter-spacing -(0.32 / 32) * 1em
			font-family $cormorant-medium

		a
			display inline-block
			transition opacity 0.5s 0.4s, transform 0.5s 0.4s

			&:before, &:after
				content: ''
				position: absolute;
				height 3px

			&:before
				content: ''
				background: $w;
				left 0
				top 100%
				width: 0%

			&:after
				background: $w;
				right: 2px;
				right 0
				top 100%
				width: 0%
				transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1);

			&:hover
				color: $w;
				transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1);

				&:before
					width: 100%;
					transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1);

				&:after
					width: 100%;
					transition: 0s;
					background: transparent;

	.bg
		background url('../../images/strip-bg.jpg')
		background-repeat no-repeat
		background-size cover
		display inline-block
		height 100%
		width auto
		bottom 0
		left 0
		right 0
		top 0
		position absolute

	+below($tablet)
		pad(.5,1,1)
		text-align center

	+above($tablet)
		width (200% / 9)

		.bg
			left -($gut * 2em)
			// right auto
			// width 100vw

.chart
	order 3
	position relative
	transition opacity 0.5s 0.3s
	.v-enter &
		opacity 0
	+below($tablet)
		pad(2,0,0)

	+above($tablet)
		// padding-left $gut * .5rem
		margin-left (100% / 9)
		width (600% / 9)


.y
	bottom 0
	height 100%
	left 0
	position absolute
	width 100%

	.step
		border-left 1px solid #979797
		border-top 1px solid rgba(#979797,.15)
		position relative

		&:last-child
			border-top 0

	.label
		color $b
		fs(10)
		line-height 0
		letter-spacing (0.09em / 12)
		pad(0,.5)
		position absolute
		text-align right
		right 100%
		top 0

		+above($tablet)
			fs(12)

.bars
	// height 100%
	height 0
	padding-bottom (290 / 449) * 100%
	position relative

	+above($tablet)
		padding-bottom (290 / 699) * 100%

	.index
		height 100%
		position absolute
		text-align center
		top 0
	for i in 0..12
		.bar-slot:nth-child({i + 1}) .index
			transition-delay 0.2s * i
	.bar-slot
		transition height
		border-bottom 1px solid #979797
		height 100%
		position relative

	.bar
		background #cecece
		bottom 0
		height 50%
		left $gut*.25em
		right $gut*.25em
		position absolute

		+above($tablet)
			left $gut*.5em
			right $gut*.5em

	.bar-label
		bottom 100%
		left 0
		color $b
		fs(10)
		position absolute
		width 100%

		+above($tablet)
			fs(12)
			letter-spacing (0.09em / 12)

.labels,
.cagr
	display flex

.labels
	.title
		color $b
		fs(8)
		// letter-spacing (0.07em / 8)
		line-height (13/ 10)
		pad(.5,.25)
		text-align center

		+above($tablet)
			fs(10)
			letter-spacing (0.07em / 10)
			line-height (13/ 10)
			pad(.5,.5)

.cagr
	border-top 1px solid #979797
	mgn(.5, 0)
	pad(.5, 0)

	.index
		color $b
		text-align center
		fs(10)

		+above($tablet)
			fs(12)
			letter-spacing (0.09em / 12)

</style>
