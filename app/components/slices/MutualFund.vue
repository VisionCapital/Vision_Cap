<template>
  <div class="mutual-fund">
    <div class="wrap">

			<transition appear>
				<fund-products
					:fundColumns="fundColumns"
					:fundInfo="data.mutual_fund_info"
					:fundsCta="data.funds_cta"
				/>
			</transition>

			<!-- if we add another slice type to prismic we will need to adjust the prop reports for data.body -->
			<transition appear>
				<fund-docs
					:documentsCta="data.documents_cta"
					:reports="data.body"
					:disclaimer="data.disclaimer"
				/>
			</transition>

    </div>

  </div>
</template>

<script>

// import LerpScroll from '../../js/lerp-scroll.js';

import Logo from '../svg/Logo.vue';
import FundDocs from '../MutualFundDocs.vue';
import FundProducts from '../MutualFundProducts.vue';

export default {

	components: {
		FundDocs,
		FundProducts,
		Logo
	},

	data() {
		let data = this.$cms.funds.data;

		let reasons = data.reasons;

		let fundColumns = {
			'code': data.code_title,
			'currency': data.currency_title,
			'class': data.class_title,
			'date': data.date_title,
			'value': data.value_title,
			'pdf': data.pdf_title
		};

		return {
			data,
			fundColumns,
			reasons
		};
	},

	created() {
		// this.$cms.loadType('mutual_funds').then((results) => {
		// 	this.resources = results.results;
		// });
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
		pad(3, 0, 0);

a
	width auto
	&:before, &:after
		display none

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

svg
	fill $blue

</style>
