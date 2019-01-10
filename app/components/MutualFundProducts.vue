<template>

  <div class="products">

    <div class='mobile' v-if="fundsCta" v-html="$cms.htmlField(fundsCta)">Select Code</div>

    <div class="desktop-tablet">
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
          <a :href="fund.pdf.url" 
            :name="fund.pdf.name" 
            :type="fund.pdf.link_type" 
            v-html="fund.pdf.name"/>
        </p>

				<div class="bg"></div>

      </div>
    </div>

    <div class="mobile">
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
          v-html="fundInfo[fundIdx].pdf.name"/>
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
	position absolute
	height 100%
	width 100%
	z-index -1
	left 50%
	transform translateX(-50%)
	+below($tablet)
		width 100vw

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

.row
	position relative
	display flex
	justify-content space-between
	align-items flex-end
	+below($mobile)
		border-bottom 1px solid $bluesat
		&:last-child
			border-bottom none
	&:nth-child(even)
		.bg 
			background $lightgrey
.products
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
	p, h4
		+above($mobile)
			width (100% / 6)
	p
		+below($mobile)
			fs(17)

</style>
