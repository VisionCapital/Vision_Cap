<template>
  <div class="mutual-fund">
    <div class="wrap">

			<div class="motivation">

				<h2 v-html="data.reasons_heading[0].text"></h2>

				<div class="columns">
					<div v-for="(reason, idx) in reasons" :key="idx">
						<h4 v-html="$cms.textField(reason.heading)" v-if="reason.heading"></h4>
						<ul>
							<li v-for="(item, i) in reason.list_items" :key="'item' + i" v-html="item.text"></li>
						</ul>
					</div>
				</div>

			</div>

			<div class="funds">

				<div v-if="$store.state.device.mobile && data.funds_cta" v-html="$cms.htmlField(data.funds_cta)">Select Code</div>

				<div v-if="!$store.state.device.mobile">
					<div class="heading row">
						<h4 v-for="columnTitle in fundSpecs" v-html="$cms.textField(columnTitle)"></h4>
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
						<div class="tab" v-for="(tab, idx) in fundInfo"
							v-html="$cms.textField(tab.code)"
							:key="'tab' + idx"
							v-if="fundIdx !== idx"
							@click="fundSelect(idx)"
						></div>
					</div>

					<div class="row">
						<h4 v-html="'currency'"></h4>
						<p v-html="$cms.textField(fundInfo[fundIdx].currency)" v-if="fundInfo[fundIdx].currency"></p>
					</div>

					<div class="row">
						<h4 v-html="'class'"></h4>
						<p v-html="fundInfo[fundIdx].class" v-if="fundInfo[fundIdx].class"></p>
					</div>
				
					<div class="row">
						<h4 v-html="'nav'"></h4>
						<p v-html="$cms.textField(fundInfo[fundIdx].value)"></p>
					</div>

					<div class="row">
						<h4 v-html="'fundfact'"></h4>
						<a :href="fundInfo[fundIdx].pdf.url" 
							:name="fundInfo[fundIdx].pdf.name" 
							:type="fundInfo[fundIdx].pdf.link_type" 
							v-html="fundInfo[fundIdx].pdf.name"/>
					</div>

				</div>

			</div>


			<div class="documents">
				<div v-if="$store.state.device.mobile && data.documents_cta" v-html="$cms.htmlField(data.documents_cta)">select document type</div>

				<div class="dropdown" v-if="$store.state.device.mobile" @click="reportDrop = !reportDrop">
					<div class="tab" v-html="reports[reportIdx].primary.tab_title[0].text"></div>
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
					<div class="row" v-for="document in reports[reportIdx].items">
						<div>
							<h5 v-html="$cms.textField(document.document_title)"></h5>
							<p v-html="document.date"></p>
						</div>
						<a class="pdf" :href="document.pdf.url">pdf icon</a>
					</div>
				</div>

			</div>
		
			<div class="disclaimer" v-if="data.disclaimer" v-html="$cms.htmlField(data.disclaimer)"></div>

    </div>

		<page-footer/>

  </div>
</template>

<script>

// import LerpScroll from '../../js/lerp-scroll.js';


export default {

	data() {
		let data = this.$cms.funds.data;

		// may have to change up reports should we add another slice type
		let reports = data.body;
		let fundInfo = data.mutual_fund_info;
		let reasons = data.reasons;

		let fundSpecs = {
			'code': data.code_title,
			'currency': data.currency_title,
			'class': data.class_title,
			'date': data.date_title,
			'value': data.value_title,
			'pdf': data.pdf_title
		};

		return {
			data,
			fundSpecs,
			reasons,
			fundInfo,
			reports,
			reportDrop: false,
			fundDrop: false,
			reportIdx: 0,
			fundIdx: 0
		};
	},
	computed: {
		fundsMobile() {
			// let fundsInfoMob = Array.from(this.fundInfo);
			// fundsInfoMob.splice(this.fundIdx, 1);
			// return fundsInfoMob;
		}
	},
	methods: {
		reportSelect(idx) {
			this.reportIdx = idx;
			if (this.$store.state.device.mobile) {
				this.reportDrop = false;
			}
		},

		fundSelect(idx) {
			this.fundIdx = idx;
			this.fundDrop = false;
		}
	},
	mounted() {

		// this.scroll = new LerpScroll(this.$el);
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.mutual-fund
	@extend .slice
	overflow hidden
	.wrap
		position relative
		pad(3, 0);


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



.columns
	position relative
	+above($tablet)
		display flex
		flex-wrap wrap
		justify-content space-between
	h4 
		color $blue
	>div
		+above($tablet)
			width 45%

.funds
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
			position relative
			left -15vw
			width 100vw
			padding 5% 15vw
			
.disclaimer
	fs(12)
	width 60%
	+below($tablet)
		width 90%
</style>
