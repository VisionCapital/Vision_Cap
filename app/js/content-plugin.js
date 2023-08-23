
const CMS_ADAPTER = __CMS_ADAPTER; // eslint-disable-line no-undef

const cms = require(`./adapter-${CMS_ADAPTER}.js`).default;
let adapter = new cms.CMSAdapter();

const ContentPlugin = {
	init(vue) {
		ContentPlugin.vue = vue;
	},
	preload() {
		return new Promise((resolve) => {
			adapter.init().then(() => resolve());
		});
	}
};

ContentPlugin.install = (Vue) => {

	Vue.component('NoSlice', () => import('../components/slices/NoSlice.vue'));
	// Vue.component('PageHeader', () => import('../components/slices/Header.vue'));
	Vue.component('Hero', () => import('../components/slices/Hero.vue'));
	// New Slice:
	Vue.component('HeroButton', () => import('../components/slices/test_page.vue'));
	// End New Slice
	Vue.component('FlexibleSlice', () => import('../components/slices/FlexibleSlice.vue'));
	Vue.component('BarChart', () => import('../components/slices/BarChart.vue'));
	Vue.component('PartnerImage', () => import('../components/slices/ImageRow.vue'));
	Vue.component('InfoCards', () => import('../components/slices/InfoCards.vue'));
	Vue.component('MutualFund', () => import('../components/slices/MutualFund.vue'));
	Vue.component('ListColumns', () => import('../components/slices/ListColumns.vue'));
	Vue.component('Map', () => import('../components/slices/Map.vue'));
	Vue.component('NewsletterSignup', () => import('../components/slices/NewsletterSignup.vue'));
	Vue.component('PageFooter', () => import('../components/slices/Footer.vue'));
	Vue.component('TwoColumnCopy', () => import('../components/slices/TwoColumnCopy.vue'));
	Vue.component('TeamCard', () => import('../components/slices/TeamCard.vue'));
	Vue.component('ContactCard', () => import('../components/slices/ContactCard.vue'));
	Vue.component('ContactForm', () => import('../components/slices/Contact.vue'));
	Vue.component('FundGate', () => import('../components/slices/FundGate.vue'));
	Vue.component('FundsInfo', () => import('../components/slices/FundsInfo.vue'));
	Vue.component('Resources', () => import('../components/slices/Resources.vue'));
	Vue.component('ResourceIndex', () => import('../components/slices/ResourceIndex.vue'));
	Vue.component('SingleColumnCopy', () => import('../components/slices/SingleColumnCopy.vue'));
	// Vue.component('Button', () => import('../components/svg/Button.vue'));

	Vue.prototype.getContent = function() { // eslint-disable-line func-names

		this.$contentPlugin = ContentPlugin;
		this.$cms = adapter;

	};

	Vue.mixin({ beforeCreate: Vue.prototype.getContent });

};

export default ContentPlugin;
