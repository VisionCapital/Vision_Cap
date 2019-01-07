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
				<div v-if="$store.state.device.mobile">Select Code</div>
				<div v-if="!$store.state.device.mobile">
					<div class="heading row">
						<h4 v-for="columnTitle in fundSpecs" v-html="columnTitle"></h4>
					</div>
					<div class="row" v-for="(fund, idx) in fundInfo" :key="idx">
						<p v-html="$cms.textField(fund.code)" v-if="fund.code"></p>
						<p v-html="$cms.textField(fund.currency)" v-if="fund.currency"></p>
						<p v-html="fund.class" v-if="fund.class">

						<!-- prismic-dom can convert to ISO date if required -->
						<p v-html="fund.date"></p>
						<p v-html="$cms.textField(fund.currency)"></p>
						<a :href="fund.pdf.url" 
							:name="fund.pdf.name" 
							:type="fund.pdf.link_type" 
							v-html="fund.pdf.name"/>
					</div>
				</div>

				<div v-else>
					<div class="dropdown" @click="fundDrop = !fundDrop">
						<div class="tab" v-html="funds[fundIdx].code"></div>
					</div>

					<div class="heading-tabs" v-if="fundDrop">
						<div class="tab" v-for="(tab, idx) in funds"
							v-html="tab.code"
							v-if="idx !== fundIdx"
							:key="'tab' + idx"
							@click="fundSelect(idx)"
						></div>
					</div>

					<div class="row" v-for="(category, idx) in funds[fundIdx].info" :key="'category' + idx">
						<h4 v-html="fundSpecs[idx + 1]"></h4>
						<p  v-html="category"></p>
					</div>

					<div class="row">
						<h4 v-html="fundSpecs[fundSpecs.length - 1]"></h4>
						<p>
							<a :href="funds[fundIdx].pdf">pdf icon</a>
						</p>
					</div>
				</div>
			</div>


			<div class="documents">
				<div v-if="$store.state.device.mobile">select document type</div>

				<div class="dropdown" v-if="$store.state.device.mobile" @click="reportDrop = !reportDrop">
					<div class="tab" v-html="reports[reportIdx].title"></div>
				</div>

				<div class="heading-tabs" v-if="!$store.state.device.mobile || reportDrop">

					<div class="tab" v-for="(tab, idx) in reports" 
						v-html="tab.title"
						:class="{selected: idx === reportIdx}"
						:key="'tab' + idx"
						@click="reportSelect(idx)"
					></div>

				</div>

				<div class="report-content">
					<div class="bg" v-if="!$store.state.device.mobile"></div>
					<div class="row" v-for="document in reports[reportIdx].documents">
						<div>
							<h5 v-html="document.title"></h5>
							<p v-html="document.date"></p>
						</div>
						<a class="pdf" :href="document.pdf">pdf icon</a>
					</div>
				</div>

			</div>
		
			<div class="disclaimer" v-html="'the vision opportunity funds refers to etc'"></div>

    </div>
  </div>
</template>

<script>

// import LerpScroll from '../../js/lerp-scroll.js';

export default {

	data() {
		let data = this.$cms.funds.data;

		console.log(this.$cms);
		console.log(data);
		let fundInfo = data.mutual_fund_info;
		let reasons = data.reasons;


		let fundSpecs = [
			'Code',
			'Currency',
			'Class',
			'As at',
			'NAV($)',
			'Fund Fact'
		];

		let reports = [
			{
				title: 'Portfolio Summary',
				documents: [
					{
						title: 'Fund Facts Document',
						date: 'jul 27th, 2018',
						pdf: 'something.pdf'
					},
					{
						title: 'Fund Facts Document',
						date: 'jul 27th, 2018',
						pdf: 'something.pdf'
					}
				]
			},
			{
				title: 'Regulatory Filings',
				documents: [
					{
						title: 'Financial Statement',
						date: 'jul 27th, 2018',
						pdf: 'something.pdf'
					},
					{
						title: 'Financial Statement',
						date: 'jul 27th, 2018',
						pdf: 'something.pdf'
					}
				]
			},
			{
				title: 'Regulatory Filings',
				documents: [
					{
						title: 'Financial Statement',
						date: 'jul 27th, 2018',
						pdf: 'something.pdf'
					},
					{
						title: 'Financial Statement',
						date: 'jul 27th, 2018',
						pdf: 'something.pdf'
					}
				]
			}
		];

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
		left (-1080px / 2)
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
