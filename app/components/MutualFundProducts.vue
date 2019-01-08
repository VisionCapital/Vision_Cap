<template>

  <div class="products">

    <div v-if="$store.state.device.mobile && fundsCta" v-html="$cms.htmlField(fundsCta)">Select Code</div>

    <div v-if="!$store.state.device.mobile">
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
      </div>
    </div>

    <div v-else>
      <div class="dropdown" @click="fundDrop = !fundDrop">
        <div class="tab" v-html="$cms.textField(fundInfo[fundIdx].code)"></div>
      </div>

      <div class="heading-tabs" v-if="fundDrop">
        <div class="tab" 
					:class="{hidden: fundIdx !== idx}"
					v-for="(tab, idx) in fundInfo"
          v-html="$cms.textField(tab.code)"
          :key="'tab' + idx"
          @click="fundSelect(idx)"
        ></div>
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

export default {
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
			this.fundIdx = idx;
			this.fundDrop = false;
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

.tab
	background $grey
	width calc((100% - 40px) / 5)
	margin-right 10px
	padding 0.5em 0
	cursor pointer
	&.hidden
		display none
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

.products
	+above($tablet)
		text-align center
	.dropdown
		position relative
		left -15vw
		width 100vw
		padding 5% 15vw
		background $grey
	h4
		color $blue
		+below($tablet)
			fs(24)
	p, h4
		+above($tablet)
			width (100% / 6)
	p
		+below($tablet)
			fs(17)

</style>
