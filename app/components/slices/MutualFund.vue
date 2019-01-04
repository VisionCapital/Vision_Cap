<template>
  <div class="mutual-fund">
    <div class="wrap">

			<div class="motivation">

				<h2 v-html="heading"></h2>

				<div class="columns">
					<ul v-for="(reason, idx) in reasons" :key="idx">
						<h4 v-html="reason.title" v-if="reason.title"></h4>
						<li v-for="(item, idx) in reason.copy" :key="'item' + idx" v-html="item"></li>
					</ul>
				</div>

			</div>


			<div class="funds">
				<div v-if="$store.state.device.mobile">Select Code</div>
				<div v-if="!$store.state.device.mobile">
					<div class="heading row">
						<h4 v-for="columnTitle in fundSpecs" v-html="columnTitle"></h4>
					</div>
					<div class="row" v-for="(fund, idx) in funds" :key="idx">
						<p v-html="fund.code"></p>
						<p v-for="(category, idx) in fund.info" :key="'category' + idx" v-html="category"></p>
						<p>
							<a :href="fund.pdf">pdf icon</a>
						</p>
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
							@click="fundIdx = idx"
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
						@click="reportIdx = idx"
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

import airprops from '../../mixins/airprops';

export default {

	mixins: [ airprops ],

	data() {

		let reasons = [
			{
				title: '<h4>Strategy</h4>',
				copy: [
					'Buying Real Estate cheaper in the stock market than in the property market',
					'Profiting from declining prices on overvalued publicly traded real estate securities'
					+ '"One cant short an overvalued mall or office building, but can short overvalued securities"'
				]
			},
			{
				title: '<h4>Strategy</h4>',
				copy: [
					'Buying Real Estate cheaper in the stock market than in the property market',
					'Profiting from declining prices on overvalued publicly traded real estate securities'
					+ '"One cant short an overvalued mall or office building, but can short overvalued securities"'
				]
			},
			{
				title: '<h4>Strategy</h4>',
				copy: [
					'Buying Real Estate cheaper in the stock market than in the property market',
					'Profiting from declining prices on overvalued publicly traded real estate securities'
					+ '"One cant short an overvalued mall or office building, but can short overvalued securities"'
				]
			}
		];

		let funds = [
			{
				info: [
					'CAD',
					'A',
					'12-Dec-18',
					8.80
				],
				code: 'DAM500',
				pdf: 'something.pdf'
			},
			{
				info: [
					'EU',
					'A',
					'12-Dec-18',
					8.80
				],
				code: 'DAM500',
				pdf: 'something.pdf'
			}
		];

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
			fundSpecs,
			reasons,
			funds,
			reports,
			reportDrop: false,
			fundDrop: false,
			reportIdx: 0,
			fundIdx: 0
		};
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
	ul
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
