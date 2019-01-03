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
				<div class="heading row">
					<h4 v-for="columnTitle in fundSpecs" v-html="columnTitle"></h4>
				</div>
				<div class="row" v-for="(fund, idx) in funds" :key="idx">
					<p v-for="(category, idx) in fund" :key="'category' + idx" v-html="category"></p>
				</div>
			</div>


			<div class="reports">

				<div class="heading-tabs">
					<div class="tab" v-for="(tab, idx) in reports" 
						v-html="tab.title"
						:class="{selected: idx === reportIdx}"
						:key="'tab' + idx"
						@click="reportIdx = idx"
					></div>
				</div>

				<div class="report-content">
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
				code: 'DAM500',
				currency: 'CAD',
				class: 'A',
				date: '12-Dec-18',
				nav: 8.80,
				pdf: 'something.pdf'
			},
			{
				code: 'DAM500',
				currency: 'CAD',
				class: 'A',
				date: '12-Dec-18',
				nav: 8.80,
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
			}
		];


		return {
			fundSpecs,
			reasons,
			funds,
			reports,
			reportIdx: 0
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


.columns
	display flex
	flex-wrap wrap
	position relative
	justify-content space-between
	h4 
		color $blue
	ul
		width 45%

.funds
	text-align center
	.row
		display flex
		&:nth-child(even)
			background $lightgrey
	p, h4
		width (100% / 6)

.reports
	pad(2,0)
	
	h5, p
		mgn(1,1,.5,0)
		display inline-block
	h5
		color $blk
		font-family $cormorant
	.report-content
		background $lightgrey
	.row
		display flex
		justify-content space-between
		align-items flex-end
		border-bottom 1px solid blue
		pad(0,1.5)

	.heading-tabs
		display flex
		text-align center
	.tab
		background $grey
		width calc((100% - 40px) / 5)
		margin-right 10px
		padding 0.5em 0
		&:last-child
			margin-right 0
	.selected
		background $lightgrey
		color $blue

.disclaimer
	fs(12)
</style>
