<template>
	<div class="bar-chart">

		<div class="wrap">

			<div class="title-copy" v-if="data.fields.bar_chart_title"
				v-html="data.html('bar_chart_title')"/>

		</div>

		<div class="title-card" v-if="$store.state.device.mobile">

			<div class="bg"/>

			<h2 v-html="data.html('vision_opp_pdf_title')"/>

			<a :href="data.fields.pdf_upload.url"
				target="_blank" rel="noopener"
				class="active"
				v-html="data.text('pdf_link_name')"
				:title="data.text('pdf_link_name')"/>

		</div>

		<div class="wrap">

			<div class="title-card" v-if="!$store.state.device.mobile">

				<div class="bg"/>

				<h2 v-html="data.html('vision_opp_pdf_title')"/>

				<a :href="data.fields.pdf_upload.url"
					v-if="data.fields.pdf_upload.url"
					target="_blank" rel="noopener"
					class="active"
					v-html="data.text('pdf_link_name')"
					:title="data.text('pdf_link_name')"/>

			</div>

			<div class="chart">

				<div class="bars">

					<div class="y">

						<div class="title-vertical">
							Cumulative Total Return
						</div>

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
							<div class="bar" ref="bar" :style="{
								background: bar.name.includes('Vision') ? '#00227d' : '#cecece',
								height: bar.returns / max * 100 + '%'
							}">
								<div class="bar-label" ref="barLabel">
									{{ bar.returns + '%' }}
								</div>
							</div>
						</div>

					</div>

				</div>

				<div class="labels">

					<div class="title" v-for="(bar, idx) in indices" :key="idx"
						:style="{ width: 1 / indices.length * 100 + '%' }">
						<div class="title-text" v-html="bar.name">
						</div>
					</div>
					<!-- <div class="index" v-for="(bar, idx) in indices" :key="idx">
						{{ bar.cagr + '%' }}
					</div> -->

				</div>


				<div class="cagr">

					<div class="cagr-label">
						<p>CAGR</p>
					</div>
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
import { TweenMax } from 'gsap/TweenMax';

export default {

	mixins: [ airprops ],

	props: [ 'inview' ],

	watch: {
		inview(newVal) {
			if (newVal) {
				let bars = this.$refs.bar;
				for (let i in bars) {
					if (bars[i]) {
						TweenMax.from(bars[i], 0.5, {
							height: 0,
							delay: 0.3 + i * 0.1
						});
						TweenMax.from(this.$refs.barLabel[i], 0.3, {
							opacity: 0,
							delay: 0.6 + i * 0.1
						});
					}
				}
			}
		}
	},

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

.bar-chart
	@extend $slice
	pad(2,0)

	+below($notebook)
		&:nth-child(even)
			background $lightgrey

.wrap
	display flex

	+above($notebook)
		flex-wrap wrap

	+below($notebook)
		flex-direction column

.title-copy
	order 1
	width 100%

	+above($notebook)
		padding-bottom 3rem

	.v-enter &, .onpage:not(.inview) &
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

	.v-enter &, .onpage:not(.inview) &
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
			+below($notebook)
				fs(mp(2))
			+above($notebook)
				fs(mp(1))
			+above($notebook)
				fs(mp(2))

		a
			display inline-block
			transition opacity 0.5s 0.4s, transform 0.5s 0.4s

			&::after
				background $w

			&:hover
				&::after
					background $w

	.bg
		background url('../../images/strip-bg.jpg')
		background-repeat no-repeat
		background-size cover
		height 100%
		left 0
		right 0
		top 0
		position absolute
		transition opacity 500ms

		.v-enter &, .onpage:not(.inview) &
			opacity 0

	+above($notebook)
		width (200% / 9)

		.bg
			left -($gut * 2em)

	+below($notebook)
		mgn(0, .5)
		pad(.5,1,1.5)
		text-align center

.chart
	order 3
	position relative
	transition opacity 0.5s 0.3s

	.v-enter &, .onpage:not(.inview) &
		opacity 0

	+below($notebook)
		margin-left $gut * -.25em
		margin-right $gut * -.25em
		pad(2,0,0,2)

	+above($notebook)
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

		+above($notebook)
			fs(12)
			line-height 0

		&::after
			border-top 1px solid #979797
			content ''
			position absolute
			top -1px
			right 0
			width 5px

.bars
	height 0
	padding-bottom (290 / 240) * 100%
	position relative

	+above($notebook)
		padding-bottom ((290 * 1.7) / 449) * 100%

	+above($notebook)
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

		+above($notebook)
			left $gut*.5em
			right $gut*.5em

	.bar-label
		bottom 100%
		left 0
		color $b
		fs(10)
		line-height (15 / 10)
		position absolute
		width 100%

		+above($notebook)
			fs(12)
			letter-spacing (0.09em / 12)

		+below($mobile)
			margin auto
			padding-top 1em
			transform rotate(180deg)
			writing-mode: vertical-rl;

.labels,
.cagr
	display flex
	width 100%

.labels
	.title
		color $b
		fs(10)
		line-height (15/ 10)
		pad(.5,.5)

		+above($notebook)
			fs(10)
			letter-spacing (0.07em / 10)
			line-height (13 / 10)
			position relative
			text-align center

			&::before, &::after
				border-left 1px solid #979797
				height 6px
				position absolute
				top 0

			&::before
				content ''
				left 0

			&:last-child
				&::after
					content ''
					right 0

		+below($notebook)
			border-left 1px solid $grey
			pad(.5, .25, 1, .25)

			&:first-child
				border-left none

	.title-text
		+below($notebook)
			text-align right
			transform rotate(180deg)
			writing-mode: vertical-rl

.title-vertical
	color $blue
	position absolute
	margin auto
	right 100%
	white-space: nowrap;
	transform rotateZ(-90deg)
	text-align center
	top 50%
	fs(12)


.cagr
	position relative
	.index
		color $b
		text-align center
		fs(10)

	+above($notebook)
		border-top 1px solid #979797
		mgn(.5, 0)
		pad(.5, 0)

		.index
			fs(12)
			letter-spacing (0.09em / 12)

	+below($notebook)
		mgn(-.5, 0, 1)

.cagr-label
	bottom 0
	position absolute
	margin-left -3rem
	color $blue
	fs(12)

	/deep/ p
		mgn(.5, 0)

		+below($notebook)
			margin 0

</style>
