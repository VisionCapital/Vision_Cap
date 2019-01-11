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
        <div>
          <h5 v-html="$cms.textField(document.document_title)"></h5>
          <p v-html="document.date"></p>
        </div>
			
			<div class="align-pdf">
			<a class="pdf" :href="document.pdf.url">
					<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
						width="50.000000pt" height="72.000000pt" viewBox="0 0 50.000000 72.000000"
						preserveAspectRatio="xMidYMid meet">

						<g transform="translate(0.000000,72.000000) scale(0.100000,-0.100000)"
						stroke="none">
						<path d="M0 360 l0 -360 250 0 250 0 0 235 0 235 -115 0 -115 0 0 125 0 125
						-135 0 -135 0 0 -360z m420 -5 l0 -25 -170 0 -170 0 0 25 0 25 170 0 170 0 0
						-25z m0 -120 l0 -25 -170 0 -170 0 0 25 0 25 170 0 170 0 0 -25z m0 -125 l0
						-30 -170 0 -170 0 0 30 0 30 170 0 170 0 0 -30z"/>
						<path d="M300 620 l0 -100 102 0 103 0 -100 100 c-55 55 -101 100 -102 100 -2
						0 -3 -45 -3 -100z"/>
						</g>
					</svg>
					<span>.PDF</span>
			</a>
			</div>
      </div>

			<div class="disclaimer" v-if="disclaimer" v-html="$cms.htmlField(disclaimer)"></div>

    </div>

  </div>

</template>

<script>

import ArrowHead from './svg/ArrowHead.vue';

export default {
	components: {
		ArrowHead
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

.align-pdf
	pad(0,0,0.2,0)

svg
	width 1.2rem
	display: inline-block;
	vertical-align: top;
	fill $blue
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
	+below($mobile)
		width 100%
		background none 
		fs(20)
		color $blue

	&:last-child
		margin-right 0

.row
	display flex
	justify-content space-between
	align-items flex-end
	border-bottom 1px solid $bluesat
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
		// margin-right 0

.all-tabs
	+below($mobile)
		position relative
		left 50%
		width 100vw
		transform translateX(-50%)
		padding 5% ((100vw - 82vw) / 2)
		background $grey

.documents
	pad(2,0,0)

	.report-content
		position relative

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
	fs(12)
	pad(3,0)
	+above($tablet)
		width 70%
	/deep/ p 
		margin 0
		max-width 100%
</style>
