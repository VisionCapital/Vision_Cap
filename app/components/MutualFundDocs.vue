<template>

  <div class="documents">
    <div v-if="$store.state.device.win.x <= 375 && documentsCta" v-html="$cms.htmlField(documentsCta)">select document type</div>

		<div class="all-tabs">

			<div class="current-selection" v-if="$store.state.device.win.x <= 375" @click="reportDrop = !reportDrop">
				<div class="tab" v-html="reports[reportIdx].primary.tab_title[0].text"></div>
				<arrow-head class="arrow-head" :pointDown="reportDrop"/>
			</div>

			<div class="heading-tabs" v-if="$store.state.device.win.x > 375" :style="{display: reportDrop ? 'flex' : 'none'}">

				<div class="tab" v-for="(tab, idx) in reports"
					v-html="$cms.textField(tab.primary.tab_title)"
					:class="{selected: idx === reportIdx}"
					:key="'tab' + idx"
					@click="reportSelect(idx)"
				></div>

			</div>

		</div>

    <div class="report-content">
      <div class="bg" v-if="$store.state.device.win.x > 375"></div>
      <div class="row" v-for="(document, idx) in reports[reportIdx].items" :key="idx">

        <div class="pdf-info">
          <h5 v-html="$cms.textField(document.document_title)"></h5>
          <p v-html="document.date"></p>
        </div>

				<div class="align-pdf">
					<a class="pdf" :href="document.pdf.url">
						<pdf-icon class="pdf-icon"/>
						<span>.PDF</span>
					</a>
				</div>

				<div class="border"></div>

      </div>

			<div class="disclaimer" v-if="disclaimer">
				<p v-html="$cms.textField(disclaimer)"/>
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
		'disclaimer',
		'reports',
		'documentsCta'
	],
	data() {

		let reportDrop = true;
		if (window.innerWidth < 376) {
			reportDrop = false;
		}
		return {
			reportDrop,
			reportIdx: 0
		};
	},
	methods: {
		reportSelect(idx) {
			// might be simpler to splice and push the selected fund in the array to cut down on styling
			this.reportIdx = idx;
			if (window.innerWidth < 376) {
				this.reportDrop = false;
			}
		}
	}
};
</script>

<style lang="stylus" scoped>

@import "../styl/_variables"

.documents
	pad(2,0,0)
	transition all 2s

.align-pdf
	pad(0,0,0.2,0)

.pdf-icon
	width 1.2rem
	display: inline-block;
	vertical-align: top;
	margin-right 0.5rem

a
	width auto
	&:before, &:after
		display none

.arrow-head
	height 20px
	width 20px

.tab
	background $grey
	width calc((100% - 40px) / 5)
	margin-right 10px
	padding 0.5em 0
	cursor pointer
	transition transform 0.3s, opacity 0.001s
	.v-enter &, .onpage:not(.inview) &
		transform translateY(100%)
		opacity 0
	for i in 0..12
		&:nth-child({i + 1})
			transition-delay 0.05s * i

	+below($mobile)
		width 100%
		background none
		fs(20)
		color $blue

	&:last-child
		margin-right 0

for i in 1..12
	.row:nth-child({i})
		.pdf-info, .align-pdf
			transition-delay 0.2s * i
		.border
			transition-delay 0.15s * i

.pdf-info, .align-pdf
	transition opacity 0.3s, transform 0.3s
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateY(20%)

.border
	height 1px
	width 100%
	position absolute
	left 0
	bottom 0
	background $bluesat
	transition width 0.45s
	.v-enter &, .onpage:not(.inview) &
		width 0%

.row
	display flex
	position relative
	justify-content space-between
	align-items flex-end
	+above($tablet)
		pad(0,1.5)
	+below($mobile)
		&:last-child
			border-bottom none

h5, p
	mgn(1,1,.5,0)
	+above($mobile)
		display inline-block

p
	+below($mobile)
		margin-top 0
h5
	color $blk
	font-family $cormorant
	+below($mobile)
		fs(24)

.all-tabs
	position relative
	z-index 1
	+below($mobile)
		left 50%
		width 100vw
		transform translateX(-50%)
		padding 5% ((100vw - 82vw) / 2)
		background $grey

.report-content
	position relative
	z-index 2
.heading-tabs
	+above($mobile)
		display flex
		text-align center
	+below($tablet)
		position relative
		width 100vw
		left 50%
		transform translateX(-50%)
	+below($mobile)
		left auto
		transform none

.bg
	transition height 0.5s
	.v-enter &, .onpage:not(.inview) &
		height 0
	background $lightgrey
	z-index -1
	position absolute
	left 50%
	transform translateX(-50%)
	width 100vw
	height 100%

.selected
	background $lightgrey
	color $blue
	+below($mobile)
		display none
.current-selection
	width 100%
	background $grey
	+below($mobile)
		display flex
		justify-content space-between
		align-items center

.disclaimer
	transition opacity 0.3s 1s, transform 0.3s 1s
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateY(3em)
	fs(12)
	pad(3,0)
	+above($tablet)
		width 70%
	/deep/ p
		margin 0
		max-width 100%
</style>
