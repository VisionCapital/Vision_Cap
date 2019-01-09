<template>

  <div class="documents">
    <div v-if="$store.state.device.mobile && documentsCta" v-html="$cms.htmlField(documentsCta)">select document type</div>

    <div class="dropdown" v-if="$store.state.device.mobile" @click="reportDrop = !reportDrop">
      <div class="tab" v-html="reports[reportIdx].primary.tab_title[0].text"></div>
			<arrow-head class="arrow-head" :pointDown="reportDrop"/>
    </div>

    <div class="heading-tabs" v-if="!$store.state.device.mobile || reportDrop">

      <div class="tab" v-for="(tab, idx) in reports" 
        v-html="$cms.textField(tab.primary.tab_title)"
        :class="{selected: idx === reportIdx}"
        :key="'tab' + idx"
        @click="reportSelect(idx)"
      ></div>

    </div>

    <div class="report-content">
      <div class="bg" v-if="!$store.state.device.mobile"></div>
      <div class="row" v-for="(document, idx) in reports[reportIdx].items" :key="idx">
        <div>
          <h5 v-html="$cms.textField(document.document_title)"></h5>
          <p v-html="document.date"></p>
        </div>
        <a class="pdf" :href="document.pdf.url">pdf icon</a>
      </div>
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
		'reports',
		'documentsCta'
	],
	data() {

		return {
			reportDrop: false,
			reportIdx: 0
		};
	},
	methods: {
		reportSelect(idx) {
			this.reportIdx = idx;
			if (this.$store.state.device.mobile) {
				this.reportDrop = false;
			}
		}
	}
};
</script>

<style lang="stylus" scoped>

@import "../styl/_variables"

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
	+below($tablet)
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
	+below($tablet)
		&:last-child
			border-bottom none

.documents
	pad(2,0)
	
	h5, p
		mgn(1,1,.5,0)
		+above($tablet)
			display inline-block

	p
		+below($tablet)
			margin-top 0
	h5
		color $blk
		font-family $cormorant
		+below($tablet)
			fs(24)
			// margin-right 0
	.report-content
		position relative

	.heading-tabs
		+above($tablet)
			display flex
			text-align center
	
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
		+below($tablet)
			display none
	.dropdown
		width 100%
		background $grey
		+below($tablet)
			display flex
			justify-content space-between
			align-items center
			position relative
			left -15vw
			width 100vw
			padding 5% 15vw
			
</style>
