
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
	Vue.component('PageHeader', () => import('../components/slices/Header.vue'));
	Vue.component('Hero', () => import('../components/slices/Hero.vue'));
	Vue.component('BarChart', () => import('../components/slices/BarChart.vue'));
	Vue.component('InfoCards', () => import('../components/slices/InfoCards.vue'));
	Vue.component('Map', () => import('../components/slices/Map.vue'));
	Vue.component('NewsletterSignup', () => import('../components/slices/NewsletterSignup.vue'));
	Vue.component('PageFooter', () => import('../components/slices/Footer.vue'));
	Vue.component('Resource', () => import('../components/slices/Resource.vue'));
	Vue.component('TwoColumnCopy', () => import('../components/slices/TwoColumnCopy.vue'));
	Vue.component('TeamCard', () => import('../components/slices/TeamCard.vue'));
	Vue.component('ContactCard', () => import('../components/slices/ContactCard.vue'));
	Vue.component('ContactForm', () => import('../components/slices/ContactForm.vue'));

	Vue.prototype.getContent = function() { // eslint-disable-line func-names

		this.$contentPlugin = ContentPlugin;
		this.$cms = adapter;

	};

	Vue.mixin({ beforeCreate: Vue.prototype.getContent });

};

export default ContentPlugin;
