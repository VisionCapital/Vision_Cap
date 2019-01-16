<template>
  <div class="mutual-fund" ref="mutualFund">
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
					:class="[ 'onpage', { inview : docsInview}]"
					ref="module"
					:documentsCta="data.documents_cta"
					:reports="data.body"
					:disclaimer="data.disclaimer"
				/>
			</transition>

    </div>

  </div>
</template>

<script>

import Logo from '../svg/Logo.vue';
import FundDocs from '../MutualFundDocs.vue';
import FundProducts from '../MutualFundProducts.vue';

export default {
	props: {
		page: {
			type: Object,
			required: false
		}
	},
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
			reasons,
			docsInview: false
		};
	},
	computed: {
		deviceHeight() {
			return this.$store.state.device.win.y;
		}
	},
	methods: {
		checkScroll(scrollTop) {
			let top = this.$refs.mutualFund.offsetTop + this.$refs.module.$el.offsetTop;
			if (scrollTop + this.deviceHeight * 0.75 > top) {
				this.docsInview = true;
				return;
			}
			this.docsInview = false;
		}
	},
	mounted() {
		// this.$cms.loadType('mutual_funds').then((results) => {
		// 	this.resources = results.results;
		// });

		this.scrollInterval = setInterval(() => {
			if (this.$refs.module && this.$refs.mutualFund) {
				this.checkScroll(Math.abs(this.page.scroll.pos));
			}
		}, 500);
	},
	destroy() {
		clearInterval(this.scrollInterval);
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
