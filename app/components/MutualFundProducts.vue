<template>

  <div class="products">

    <div v-if="$store.state.device.win.x <= 375 && fundsCta" v-html="$cms.htmlField(fundsCta)">Select Code</div>

    <div v-if="$store.state.device.win.x > 375">
      <div class="heading row">
        <h4 v-for="(columnTitle, idx) in fundColumns" v-html="$cms.textField(columnTitle)" :key="idx"></h4>
      </div>
      <div class="row" v-for="(fund, idx) in fundInfo" :key="idx">
        <p v-html="$cms.textField(fund.code)" v-if="fund.code"></p>
        <p v-html="$cms.textField(fund.currency)" v-if="fund.currency"></p>
        <p v-html="fund.class" v-if="fund.class">

        <!-- prismic-dom can convert to ISO date if required -->
        <p v-html="fund.date"></p>
        <p v-html="$cms.textField(fund.value)"></p>

					<p>
					<a :href="fund.pdf.url" v-if="fund.pdf.url">
						<pdf-icon class="pdf-icon"/>
						<span>.PDF</span>
					</a>
				</p>

				<div class="bg"></div>

      </div>
    </div>

    <div v-if="$store.state.device.win.x <= 375">
			<div class="dropdown">
				<div class="current-selection" @click="fundDrop = !fundDrop">
					<div class="tab" v-html="$cms.textField(fundInfo[fundIdx].code)"></div>
					<arrow-head :pointDown="fundDrop" class="arrow-head"/>
				</div>

				<div class="heading-tabs" v-if="fundDrop">
					<div class="tab"
						:class="{hidden: fundIdx === idx}"
						v-for="(tab, idx) in fundInfo"
						v-html="$cms.textField(tab.code)"
						:key="'tab' + idx"
						@click="fundSelect(idx)"
					></div>
				</div>
			</div>

      <div class="row">
        <h4 v-html="$cms.textField(fundColumns.currency)"></h4>
        <p v-html="$cms.textField(fundInfo[fundIdx].currency)" v-if="fundInfo[fundIdx].currency"></p>
      </div>

      <div class="row">
        <h4 v-html="$cms.textField(fundColumns.class)"></h4>
        <p v-html="fundInfo[fundIdx].class" v-if="fundInfo[fundIdx].class"></p>
      </div>

      <div class="row">
        <h4 v-html="$cms.textField(fundColumns.date)"></h4>
        <p v-html="fundInfo[fundIdx].date" v-if="fundInfo[fundIdx].date"></p>
      </div>

      <div class="row">
        <h4 v-html="$cms.textField(fundColumns.value)"></h4>
        <p v-html="$cms.textField(fundInfo[fundIdx].value)"></p>
      </div>

      <div class="row">
        <h4 v-html="$cms.textField(fundColumns.pdf)"></h4>
        <a :href="fundInfo[fundIdx].pdf.url"
          :name="fundInfo[fundIdx].pdf.name"
          :type="fundInfo[fundIdx].pdf.link_type"
        >
					<pdf-icon class="pdf-icon"/>
					<span>.PDF</span>
        </a>

      </div>

    </div>

  </div>


</template>

<script>

import ArrowHead from './svg/ArrowHead.vue';
import PdfIcon from './svg/PDFIcon.vue';

export default {
	components: {
		ArrowHead,
		PdfIcon
	},
	props: [
		'fundColumns',
		'fundInfo',
		'fundsCta'
	],
	data() {

		return {
			fundDrop: false,
			fundIdx: 0
		};
	},
	methods: {
		fundSelect(idx) {
			// might be simpler to splice and push the selected fund in the array to cut down on styling
			this.fundIdx = idx;
			this.fundDrop = false;
		}
	}
};
</script>

<style lang="stylus" scoped>

@import "../styl/_variables"

.pdf-icon
	height (72 / 50) * 1.2rem
	width 1.2rem
	display: inline-block;
	vertical-align: middle;
	margin-right 0.5rem

.mobile
	+above($mobile)
		display none

.desktop-tablet
	+below($mobile)
		display none

a
	width auto
	&:before, &:after
		display none

.bg
	abs()
	transition width 0.5s
	z-index 0

	.v-enter &, .onpage:not(.inview) &
		width 0

	+below($tablet)
		width 100vw

.row:nth-child(even)
	.bg
		background $lightgrey

.tab
	background $grey
	width calc((100% - 40px) / 5)
	margin-right 10px
	padding 0.5em 0
	cursor pointer
	&.hidden
		display none
	+below($mobile)
		width 100%
		background none
		fs(20)
		color $blue
	&:last-child
		margin-right 0

.dropdown
	position relative
	left 50%
	transform translateX(-50%)
	width 100vw
	padding 5% ((100vw - 82vw) / 2)
	background $grey

for i in 0..12
	.row:nth-child({i + 1})
		p, h4
			transition-delay 0.3s * i
		.bg
			transition-delay 0.1s * i

.row
	position relative
	display flex
	justify-content space-between
	align-items flex-end

	+below($mobile)
		border-bottom 1px solid $bluesat
		&:last-child
			border-bottom none
			align-items center

	/deep/ p
		position relative
		z-index 1

.products
	transition all 4s
	+above($mobile)
		text-align center
	.arrow-head
		width 20px
		height 20px
	.current-selection
		display flex
		justify-content space-between
		align-items center

	h4
		color $blue
		+below($tablet)
			fs(24)
		+below(550px)
			font-size 4vw
		+below($mobile)
			fs(24)

	p
		+below($mobile)
			fs(17)
	p, h4
		transition opacity 0.7s, transform 0.7s
		+above($mobile)
			width (100% / 6)
	.v-enter &, .onpage:not(.inview) &
		p, h4
			opacity 0
			transform translateY(30%)
</style>
